import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userName: "Usman Ali",
        folderName: 'Untitled Folder',
        folders: [],
        // folders: [
        //     { name: "Folder 1", route: "/folder1" },
        //     { name: "My Family Pics", route: "/folder2" },
        //     { name: "My Company Projects", route: "/folder3" },
        //     { name: "Important Documents", route: "/folder4" },
        //     { name: "rents files", route: "/folder5" },
        //     { name: "Important notes given by clients", route: "/folder6" },
        //     { name: "Folder 7", route: "/folder7" },
        //   ],
    },
    mutations: {
        addFolder(state, payload){
            state.folders.push({ name: payload.folderName, route: `/${payload.folderName}` })
        }
    },
    actions: {
        addNewFolder(context, payload){
            context.commit("addFolder", payload);
        }
    },
    getters:{
        userName(state){
            return state.userName;
        },
        folderName(state){
            return state.folderName;
        },
        folders(state){
            return state.folders;
        }
    }
  })