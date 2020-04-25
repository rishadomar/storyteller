import firebase from "firebase";

const state = {
	titles: [],
	stories: [],
	currentStoryId: null
}

const mutations = {
	ADD_STORY(state, payload) {
		state.stories.push(payload);
		state.currentStoryId = payload.id
	},

	ADD_TITLES(state, payload) {
		state.titles = payload
	}
}

const actions = {

	async fetchTitles(context) {
		if (state.titles.length > 0) {
			return new Promise((success) => { success([]) })
		}
		let storage = firebase.storage()
		let db = firebase.firestore()
		let titles = [];
		const querySnapshot = await db.collection("stories")
			.get()
		querySnapshot.forEach(function (doc) {
			let data = doc.data()
			let pathReference = storage.ref(doc.id + '/' + 'title.jpg')
			pathReference.getDownloadURL()
				.then(url => titles.push({
					id: doc.id,
					titles: data.titles,
					image: url,
					createdAt: data.createdAt
				})
				)
		})
		context.commit('ADD_TITLES', titles)
	},

	async fetchStoryFromCache(context, params) {
		let db = firebase.firestore()
		db.collection("cache")
			// .where('storyId', '==', params.storyId)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					context.commit('ADD_STORY', JSON.parse(doc.data().details))
				});
			})
			.catch(function (error) {
				alert('Error encountered fetching story from cache: ' + params.storyId + ' Error:' + error.code)
			})
	},

	async fetchStory(context, params) {
		if (state.stories.find(story => story.id === params.storyId)) {
			return new Promise((success) => { success([]) })
		}
		let storage = firebase.storage()
		let db = firebase.firestore()
		var documentReference = db.collection("stories").doc(params.storyId);
		let story = {};
		return documentReference.get()
			.then(document => {
				story = document.data()
				story.id = document.id
				let pathReference = storage.ref(story.id + '/' + 'title.jpg')
				pathReference.getDownloadURL()
					.then(function (url) {
						story.image = url
					})
			})
			.then(async () => {
				const querySnapshot = await db.collection("stories").doc(params.storyId).collection("pages")
					.get()
				let pages = [];
				querySnapshot.forEach(function (doc) {
					let data = doc.data()
					let pathReference = storage.ref(story.id + '/pages/' + data.number + '.jpg')
					pathReference.getDownloadURL()
						.then(function (url) {
							pages.push({
								id: doc.id,
								content: data.content,
								number: parseInt(data.number),
								audio: data.audio,
								image: url
							})
						})
						.catch(function (error) {
							alert('Error encountered finding image: ' + data.audio + ' Error:' + error.code)
						})

					// let audioPathReference = storage.ref(story.id + '/pages/' + data.number + '.mp3')
					// audioPathReference.getDownloadURL()
					// 	.then(function (url) {
					// 		pages.push({
					// 			id: doc.id,
					// 			content: data.content,
					// 			number: parseInt(data.number),
					// 			audio: data.audio,
					// 			image: url
					// 		})
					// 	})
					// 	.catch(function (error) {
					// 		alert('Error encountered finding image: ' + data.audio + ' Error:' + error.code)
					// 	})



				})
				story.pages = pages
				context.commit('ADD_STORY', story);
			})
			.catch(function (error) {
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	},

	async fetchStory_usingAwait(context, params) {
		if (state.stories.find(story => story.id === params.storyId)) {
			return new Promise((success) => { success([]) })
		}
		let storage = firebase.storage()
		let db = firebase.firestore()
		var documentReference = db.collection("stories").doc(params.storyId);
		let pages = [];
		let document = await documentReference.get()
		let story = document.data()
		story.id = document.id
		let pathReference = storage.ref(story.id + '/' + 'title.jpg')
		let url = await pathReference.getDownloadURL()
		story.image = url
		const querySnapshot = await db.collection("stories").doc(params.storyId).collection("pages").orderBy("number").get()

		for await (const doc of querySnapshot.docs) {
			let data = doc.data()
			let pathReference = storage.ref(story.id + '/pages/' + data.number + '.jpg')
			let url = await pathReference.getDownloadURL()
			let audioPathReference = storage.ref(story.id + '/pages/' + data.number + '.mp3')
			let audioUrl = await audioPathReference.getDownloadURL()
			console.log('page: ' + data.number + ' ' + audioUrl)
			pages.push({
				id: doc.id,
				content: data.content,
				number: parseInt(data.number),
				audio: audioUrl,
				image: url
			})
		}

		// querySnapshot.forEach(doc => {
		// 	let data = doc.data()
		// 	let pathReference = storage.ref(story.id + '/pages/' + data.number + '.jpg')
		// 	let url = await pathReference.getDownloadURL()
		// 	pages.push({
		// 		id: doc.id,
		// 		content: data.content,
		// 		number: parseInt(data.number),
		// 		audio: data.audio,
		// 		image: url
		// 	})
		// })
//		pages.sort((page1, page2) => page1.number - page2.number)
		story.pages = pages
		context.commit('ADD_STORY', story);
	},
}

const getters = {
	getTitles(state) {
		return state.titles;
	},
	getStory(state) {
		var story = state.stories.find(story => story.id === state.currentStoryId)
		return story
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
