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

	async fetchStory(context, params) {
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
			console.log('page: ' + data.number)
			pages.push({
				id: doc.id,
				content: data.content,
				number: parseInt(data.number),
				audio: data.audio,
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
