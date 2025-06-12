import Vue from "vue";
import Vuex from 'vuex';
import moment from "moment";
import { db } from '../db';

Vue.use(Vuex);

// Initialize lastUserId from localStorage or default to 1
const getInitialLastUserId = () => {
    const storedId = localStorage.getItem('lastUserId');
    return storedId ? parseInt(storedId) : 1;
};

// Get initial logged in user from localStorage
const getLoggedInUser = () => {
    const userStr = localStorage.getItem('loggedInUser');
    return userStr ? JSON.parse(userStr) : null;
};

export default new Vuex.Store({
    state: {
        userName: "",
        lastUserId: getInitialLastUserId(),
        loggedInUser: getLoggedInUser(),
        users: [{
            id: 1,
            name: "Default User",
            email: "default@user.com",
            password: "123456"
        }],
        folders: [],
        loginError: null,
        error: null,
        success: null
    },
    mutations: {
        setFolders(state, folders) {
            state.folders = folders;
        },
        addFolder(state, folder) {
            state.folders.push(folder);
        },
        removeFolder(state, folderId) {
            state.folders = state.folders.filter(folder => folder.id !== folderId);
        },
        updateFolder(state, { id, updates }) {
            const index = state.folders.findIndex(f => f.id === id);
            if (index !== -1) {
                state.folders[index] = { ...state.folders[index], ...updates };
            }
        },
        registerUser(state, newUser) {
            state.lastUserId++;
            localStorage.setItem('lastUserId', state.lastUserId.toString());
            state.userName = newUser.name;
            state.loggedInUser = newUser;
            // Store user in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        },
        setLoginError(state, error) {
            state.loginError = error;
        },
        setCurrentUser(state, user) {
            state.userName = user.name;
            state.loggedInUser = user;
            // Store user in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        },
        logout(state) {
            state.userName = '';
            state.loggedInUser = null;
            // Clear user from localStorage
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('isAuthenticated');
        },
        updateUserAvatar(state, avatarData) {
            if (state.loggedInUser) {
                state.loggedInUser.avatar = avatarData;
                localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser));
            }
        },
        updateUserName(state, newName) {
            if (state.loggedInUser) {
                state.loggedInUser.name = newName;
                state.userName = newName;
                localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser));
            }
        },
        updateUserPassword(state, newPassword) {
            if (state.loggedInUser) {
                state.loggedInUser.password = newPassword;
                localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser));
            }
        },
        setError(state, error) {
            state.error = error;
        },
        setSuccess(state, message) {
            state.success = message;
        }
    },
    actions: {
        async initializeStore({ commit, state }) {
            try {
                // Load initial data
                const folders = await db.getFoldersByUser(state.loggedInUser.id);
                console.log("folders by user_id", folders);
                commit('setFolders', folders);
            } catch (error) {
                console.error('Failed to initialize store:', error);
            }
        },
        async addNewFolder({ commit, state }, payload) {
            try {
                const folder = {
                    name: payload.folderName,
                    route: `/${payload.folderName}`,
                    createdAt: moment().format('YYYY-MM-DD'),
                    createdBy: state.loggedInUser.id
                };

                const id = await db.addFolder(folder);
                commit('addFolder', { ...folder, id });
                return true;
            } catch (error) {
                console.error('Failed to add folder:', error);
                return false;
            }
        },
        async registerNewUser({ commit }, payload) {
            try {
                // Check if email exists
                const existingUser = await db.getUserByEmail(payload.email);
                if (existingUser) {
                    commit('setLoginError', 'Email already exists');
                    return false;
                }

                // Add user to database
                const id = await db.addUser(payload);
                const newUser = { ...payload, id };
                commit('registerUser', newUser);
                localStorage.setItem('isAuthenticated', 'true');
                return true;
            } catch (error) {
                console.error('Failed to register user:', error);
                commit('setLoginError', 'Registration failed');
                return false;
            }
        },
        async login({ commit }, { email, password }) {
            try {
                commit('setLoginError', null);

                // Find user with matching email
                const user = await db.getUserByEmail(email);

                if (!user) {
                    commit('setLoginError', 'User not found');
                    return false;
                }

                if (user.password !== password) {
                    commit('setLoginError', 'Invalid password');
                    return false;
                }

                // Login successful
                commit('setCurrentUser', user);
                localStorage.setItem('isAuthenticated', 'true');
                return true;
            } catch (error) {
                console.error('Login failed:', error);
                commit('setLoginError', 'Login failed');
                return false;
            }
        },
        logout({ commit }) {
            commit('logout');
        },
        async updateAvatar({ commit, state }, avatarData) {
            try {
                if (state.loggedInUser) {
                    // Update in Dexie DB
                    await db.updateUser(state.loggedInUser.id, { avatar: avatarData });
                    // Update in Vuex store
                    commit('updateUserAvatar', avatarData);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Failed to update avatar:', error);
                return false;
            }
        },
        async deleteFolder({ commit }, folderId) {
            try {
                await db.deleteFolder(folderId);
                commit('removeFolder', folderId);
                return true;
            } catch (error) {
                console.error('Failed to delete folder:', error);
                return false;
            }
        },
        async renameFolder({ commit }, { folderId, newName }) {
            try {
                await db.updateFolder(folderId, { name: newName });
                commit('updateFolder', {
                    id: folderId,
                    updates: { name: newName }
                });
                return true;
            } catch (error) {
                console.error('Failed to rename folder:', error);
                return false;
            }
        },
        async updateName({ commit, state }, newName) {
            try {
                if (state.loggedInUser) {
                    await db.updateUser(state.loggedInUser.id, { name: newName });
                    commit('updateUserName', newName);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Failed to update name:', error);
                return false;
            }
        },
        async updatePassword({ commit, state }, { currentPassword, newPassword }) {
            try {
                if (!state.loggedInUser) {
                    throw new Error('No user is logged in');
                }

                // Verify current password
                if (state.loggedInUser.password !== currentPassword) {
                    throw new Error('Current password is incorrect');
                }

                // Update password in DB
                await db.updateUser(state.loggedInUser.id, { password: newPassword });

                // Update in store
                commit('updateUserPassword', newPassword);
                commit('setSuccess', 'Password updated successfully');
                return true;
            } catch (error) {
                commit('setError', error.message);
                throw error;
            }
        },
        setError({ commit }, error) {
            commit('setError', error);
        },
        setSuccess({ commit }, message) {
            commit('setSuccess', message);
        }
    },
    getters: {
        userName(state) {
            return state.userName;
        },
        folders(state) {
            return state.folders;
        },
        loginError(state) {
            return state.loginError;
        },
        getCurrentUserId(state) {
            return state.lastUserId;
        },
        getLoggedInUser(state) {
            return state?.loggedInUser || getLoggedInUser();
        },
        getUserById: () => async (id) => {
            try {
                return await db.getUserById(id);
            } catch (error) {
                console.error('Failed to get user:', error);
                return null;
            }
        }
    }
})