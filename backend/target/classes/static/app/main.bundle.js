/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "cdfab72c65b8d8e603f0";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "app/" + chunkId + ".chunk.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/app.scss":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js??ref--8-3!./src/main/webapp/app/app.scss ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "@charset \"UTF-8\";\n/*!\n * Bootstrap v4.3.1 (https://getbootstrap.com/)\n * Copyright 2011-2019 The Bootstrap Authors\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n:root {\n  --blue: #033C73;\n  --indigo: #6610f2;\n  --purple: #6f42c1;\n  --pink: #e83e8c;\n  --red: #C71C22;\n  --orange: #fd7e14;\n  --yellow: #DD5600;\n  --green: #73A839;\n  --teal: #20c997;\n  --cyan: #2FA4E7;\n  --white: #fff;\n  --gray: #868e96;\n  --gray-dark: #343a40;\n  --primary: #2FA4E7;\n  --secondary: #e9ecef;\n  --success: #73A839;\n  --info: #033C73;\n  --warning: #DD5600;\n  --danger: #C71C22;\n  --light: #f8f9fa;\n  --dark: #343a40;\n  --breakpoint-xs: 0;\n  --breakpoint-sm: 576px;\n  --breakpoint-md: 768px;\n  --breakpoint-lg: 992px;\n  --breakpoint-xl: 1200px;\n  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\narticle, aside, figcaption, figure, footer, header, hgroup, main, nav, section {\n  display: block;\n}\n\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  text-align: left;\n  background-color: #fff;\n}\n\n[tabindex=\"-1\"]:focus {\n  outline: 0 !important;\n}\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nabbr[title],\nabbr[data-original-title] {\n  text-decoration: underline;\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n  cursor: help;\n  border-bottom: 0;\n  -webkit-text-decoration-skip-ink: none;\n          text-decoration-skip-ink: none;\n}\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit;\n}\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0;\n}\n\ndt {\n  font-weight: 700;\n}\n\ndd {\n  margin-bottom: 0.5rem;\n  margin-left: 0;\n}\n\nblockquote {\n  margin: 0 0 1rem;\n}\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\na {\n  color: #2FA4E7;\n  text-decoration: none;\n  background-color: transparent;\n}\na:hover {\n  color: #157ab5;\n  text-decoration: underline;\n}\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none;\n}\na:not([href]):not([tabindex]):hover, a:not([href]):not([tabindex]):focus {\n  color: inherit;\n  text-decoration: none;\n}\na:not([href]):not([tabindex]):focus {\n  outline: 0;\n}\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  font-size: 1em;\n}\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto;\n}\n\nfigure {\n  margin: 0 0 1rem;\n}\n\nimg {\n  vertical-align: middle;\n  border-style: none;\n}\n\nsvg {\n  overflow: hidden;\n  vertical-align: middle;\n}\n\ntable {\n  border-collapse: collapse;\n}\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #868e96;\n  text-align: left;\n  caption-side: bottom;\n}\n\nth {\n  text-align: inherit;\n}\n\nlabel {\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\nbutton {\n  border-radius: 0;\n}\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\ninput,\nbutton,\nselect,\noptgroup,\ntextarea {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n\nbutton,\ninput {\n  overflow: visible;\n}\n\nbutton,\nselect {\n  text-transform: none;\n}\n\nselect {\n  word-wrap: normal;\n}\n\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\nbutton:not(:disabled),\n[type=button]:not(:disabled),\n[type=reset]:not(:disabled),\n[type=submit]:not(:disabled) {\n  cursor: pointer;\n}\n\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  padding: 0;\n  border-style: none;\n}\n\ninput[type=radio],\ninput[type=checkbox] {\n  box-sizing: border-box;\n  padding: 0;\n}\n\ninput[type=date],\ninput[type=time],\ninput[type=datetime-local],\ninput[type=month] {\n  -webkit-appearance: listbox;\n}\n\ntextarea {\n  overflow: auto;\n  resize: vertical;\n}\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\nlegend {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin-bottom: 0.5rem;\n  font-size: 1.5rem;\n  line-height: inherit;\n  color: inherit;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=search] {\n  outline-offset: -2px;\n  -webkit-appearance: none;\n}\n\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  font: inherit;\n  -webkit-appearance: button;\n}\n\noutput {\n  display: inline-block;\n}\n\nsummary {\n  display: list-item;\n  cursor: pointer;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none !important;\n}\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  line-height: 1.2;\n  color: #2FA4E7;\n}\n\nh1, .h1 {\n  font-size: 2.5rem;\n}\n\nh2, .h2 {\n  font-size: 2rem;\n}\n\nh3, .h3 {\n  font-size: 1.75rem;\n}\n\nh4, .h4 {\n  font-size: 1.5rem;\n}\n\nh5, .h5 {\n  font-size: 1.25rem;\n}\n\nh6, .h6 {\n  font-size: 1rem;\n}\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300;\n}\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: 400;\n}\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3;\n}\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline-item {\n  display: inline-block;\n}\n.list-inline-item:not(:last-child) {\n  margin-right: 0.5rem;\n}\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\n\n.blockquote {\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n}\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #868e96;\n}\n.blockquote-footer::before {\n  content: \"— \";\n}\n\n.img-fluid {\n  max-width: 100%;\n  height: auto;\n}\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  max-width: 100%;\n  height: auto;\n}\n\n.figure {\n  display: inline-block;\n}\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1;\n}\n\n.figure-caption {\n  font-size: 90%;\n  color: #868e96;\n}\n\ncode {\n  font-size: 87.5%;\n  color: #e83e8c;\n  word-break: break-word;\n}\na > code {\n  color: inherit;\n}\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 87.5%;\n  color: #fff;\n  background-color: #212529;\n  border-radius: 0.2rem;\n}\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: 700;\n}\n\npre {\n  display: block;\n  font-size: 87.5%;\n  color: #212529;\n}\npre code {\n  font-size: inherit;\n  color: inherit;\n  word-break: normal;\n}\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n\n.container {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n@media (min-width: 576px) {\n  .container {\n    max-width: 540px;\n  }\n}\n@media (min-width: 768px) {\n  .container {\n    max-width: 720px;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    max-width: 960px;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    max-width: 1140px;\n  }\n}\n\n.container-fluid {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n\n.row {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px;\n}\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0;\n}\n.no-gutters > .col,\n.no-gutters > [class*=col-] {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.col-xl,\n.col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg,\n.col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md,\n.col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm,\n.col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col,\n.col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {\n  position: relative;\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n.col {\n  flex-basis: 0;\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  max-width: 100%;\n}\n\n.col-auto {\n  -webkit-box-flex: 0;\n          flex: 0 0 auto;\n  width: auto;\n  max-width: 100%;\n}\n\n.col-1 {\n  -webkit-box-flex: 0;\n          flex: 0 0 8.3333333333%;\n  max-width: 8.3333333333%;\n}\n\n.col-2 {\n  -webkit-box-flex: 0;\n          flex: 0 0 16.6666666667%;\n  max-width: 16.6666666667%;\n}\n\n.col-3 {\n  -webkit-box-flex: 0;\n          flex: 0 0 25%;\n  max-width: 25%;\n}\n\n.col-4 {\n  -webkit-box-flex: 0;\n          flex: 0 0 33.3333333333%;\n  max-width: 33.3333333333%;\n}\n\n.col-5 {\n  -webkit-box-flex: 0;\n          flex: 0 0 41.6666666667%;\n  max-width: 41.6666666667%;\n}\n\n.col-6 {\n  -webkit-box-flex: 0;\n          flex: 0 0 50%;\n  max-width: 50%;\n}\n\n.col-7 {\n  -webkit-box-flex: 0;\n          flex: 0 0 58.3333333333%;\n  max-width: 58.3333333333%;\n}\n\n.col-8 {\n  -webkit-box-flex: 0;\n          flex: 0 0 66.6666666667%;\n  max-width: 66.6666666667%;\n}\n\n.col-9 {\n  -webkit-box-flex: 0;\n          flex: 0 0 75%;\n  max-width: 75%;\n}\n\n.col-10 {\n  -webkit-box-flex: 0;\n          flex: 0 0 83.3333333333%;\n  max-width: 83.3333333333%;\n}\n\n.col-11 {\n  -webkit-box-flex: 0;\n          flex: 0 0 91.6666666667%;\n  max-width: 91.6666666667%;\n}\n\n.col-12 {\n  -webkit-box-flex: 0;\n          flex: 0 0 100%;\n  max-width: 100%;\n}\n\n.order-first {\n  -webkit-box-ordinal-group: 0;\n          order: -1;\n}\n\n.order-last {\n  -webkit-box-ordinal-group: 14;\n          order: 13;\n}\n\n.order-0 {\n  -webkit-box-ordinal-group: 1;\n          order: 0;\n}\n\n.order-1 {\n  -webkit-box-ordinal-group: 2;\n          order: 1;\n}\n\n.order-2 {\n  -webkit-box-ordinal-group: 3;\n          order: 2;\n}\n\n.order-3 {\n  -webkit-box-ordinal-group: 4;\n          order: 3;\n}\n\n.order-4 {\n  -webkit-box-ordinal-group: 5;\n          order: 4;\n}\n\n.order-5 {\n  -webkit-box-ordinal-group: 6;\n          order: 5;\n}\n\n.order-6 {\n  -webkit-box-ordinal-group: 7;\n          order: 6;\n}\n\n.order-7 {\n  -webkit-box-ordinal-group: 8;\n          order: 7;\n}\n\n.order-8 {\n  -webkit-box-ordinal-group: 9;\n          order: 8;\n}\n\n.order-9 {\n  -webkit-box-ordinal-group: 10;\n          order: 9;\n}\n\n.order-10 {\n  -webkit-box-ordinal-group: 11;\n          order: 10;\n}\n\n.order-11 {\n  -webkit-box-ordinal-group: 12;\n          order: 11;\n}\n\n.order-12 {\n  -webkit-box-ordinal-group: 13;\n          order: 12;\n}\n\n.offset-1 {\n  margin-left: 8.3333333333%;\n}\n\n.offset-2 {\n  margin-left: 16.6666666667%;\n}\n\n.offset-3 {\n  margin-left: 25%;\n}\n\n.offset-4 {\n  margin-left: 33.3333333333%;\n}\n\n.offset-5 {\n  margin-left: 41.6666666667%;\n}\n\n.offset-6 {\n  margin-left: 50%;\n}\n\n.offset-7 {\n  margin-left: 58.3333333333%;\n}\n\n.offset-8 {\n  margin-left: 66.6666666667%;\n}\n\n.offset-9 {\n  margin-left: 75%;\n}\n\n.offset-10 {\n  margin-left: 83.3333333333%;\n}\n\n.offset-11 {\n  margin-left: 91.6666666667%;\n}\n\n@media (min-width: 576px) {\n  .col-sm {\n    flex-basis: 0;\n    -webkit-box-flex: 1;\n            flex-grow: 1;\n    max-width: 100%;\n  }\n\n  .col-sm-auto {\n    -webkit-box-flex: 0;\n            flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n\n  .col-sm-1 {\n    -webkit-box-flex: 0;\n            flex: 0 0 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-sm-2 {\n    -webkit-box-flex: 0;\n            flex: 0 0 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-sm-3 {\n    -webkit-box-flex: 0;\n            flex: 0 0 25%;\n    max-width: 25%;\n  }\n\n  .col-sm-4 {\n    -webkit-box-flex: 0;\n            flex: 0 0 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-sm-5 {\n    -webkit-box-flex: 0;\n            flex: 0 0 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-sm-6 {\n    -webkit-box-flex: 0;\n            flex: 0 0 50%;\n    max-width: 50%;\n  }\n\n  .col-sm-7 {\n    -webkit-box-flex: 0;\n            flex: 0 0 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-sm-8 {\n    -webkit-box-flex: 0;\n            flex: 0 0 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-sm-9 {\n    -webkit-box-flex: 0;\n            flex: 0 0 75%;\n    max-width: 75%;\n  }\n\n  .col-sm-10 {\n    -webkit-box-flex: 0;\n            flex: 0 0 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-sm-11 {\n    -webkit-box-flex: 0;\n            flex: 0 0 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-sm-12 {\n    -webkit-box-flex: 0;\n            flex: 0 0 100%;\n    max-width: 100%;\n  }\n\n  .order-sm-first {\n    -webkit-box-ordinal-group: 0;\n            order: -1;\n  }\n\n  .order-sm-last {\n    -webkit-box-ordinal-group: 14;\n            order: 13;\n  }\n\n  .order-sm-0 {\n    -webkit-box-ordinal-group: 1;\n            order: 0;\n  }\n\n  .order-sm-1 {\n    -webkit-box-ordinal-group: 2;\n            order: 1;\n  }\n\n  .order-sm-2 {\n    -webkit-box-ordinal-group: 3;\n            order: 2;\n  }\n\n  .order-sm-3 {\n    -webkit-box-ordinal-group: 4;\n            order: 3;\n  }\n\n  .order-sm-4 {\n    -webkit-box-ordinal-group: 5;\n            order: 4;\n  }\n\n  .order-sm-5 {\n    -webkit-box-ordinal-group: 6;\n            order: 5;\n  }\n\n  .order-sm-6 {\n    -webkit-box-ordinal-group: 7;\n            order: 6;\n  }\n\n  .order-sm-7 {\n    -webkit-box-ordinal-group: 8;\n            order: 7;\n  }\n\n  .order-sm-8 {\n    -webkit-box-ordinal-group: 9;\n            order: 8;\n  }\n\n  .order-sm-9 {\n    -webkit-box-ordinal-group: 10;\n            order: 9;\n  }\n\n  .order-sm-10 {\n    -webkit-box-ordinal-group: 11;\n            order: 10;\n  }\n\n  .order-sm-11 {\n    -webkit-box-ordinal-group: 12;\n            order: 11;\n  }\n\n  .order-sm-12 {\n    -webkit-box-ordinal-group: 13;\n            order: 12;\n  }\n\n  .offset-sm-0 {\n    margin-left: 0;\n  }\n\n  .offset-sm-1 {\n    margin-left: 8.3333333333%;\n  }\n\n  .offset-sm-2 {\n    margin-left: 16.6666666667%;\n  }\n\n  .offset-sm-3 {\n    margin-left: 25%;\n  }\n\n  .offset-sm-4 {\n    margin-left: 33.3333333333%;\n  }\n\n  .offset-sm-5 {\n    margin-left: 41.6666666667%;\n  }\n\n  .offset-sm-6 {\n    margin-left: 50%;\n  }\n\n  .offset-sm-7 {\n    margin-left: 58.3333333333%;\n  }\n\n  .offset-sm-8 {\n    margin-left: 66.6666666667%;\n  }\n\n  .offset-sm-9 {\n    margin-left: 75%;\n  }\n\n  .offset-sm-10 {\n    margin-left: 83.3333333333%;\n  }\n\n  .offset-sm-11 {\n    margin-left: 91.6666666667%;\n  }\n}\n@media (min-width: 768px) {\n  .col-md {\n    flex-basis: 0;\n    -webkit-box-flex: 1;\n            flex-grow: 1;\n    max-width: 100%;\n  }\n\n  .col-md-auto {\n    -webkit-box-flex: 0;\n            flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n\n  .col-md-1 {\n    -webkit-box-flex: 0;\n            flex: 0 0 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-md-2 {\n    -webkit-box-flex: 0;\n            flex: 0 0 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-md-3 {\n    -webkit-box-flex: 0;\n            flex: 0 0 25%;\n    max-width: 25%;\n  }\n\n  .col-md-4 {\n    -webkit-box-flex: 0;\n            flex: 0 0 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-md-5 {\n    -webkit-box-flex: 0;\n            flex: 0 0 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-md-6 {\n    -webkit-box-flex: 0;\n            flex: 0 0 50%;\n    max-width: 50%;\n  }\n\n  .col-md-7 {\n    -webkit-box-flex: 0;\n            flex: 0 0 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-md-8 {\n    -webkit-box-flex: 0;\n            flex: 0 0 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-md-9 {\n    -webkit-box-flex: 0;\n            flex: 0 0 75%;\n    max-width: 75%;\n  }\n\n  .col-md-10 {\n    -webkit-box-flex: 0;\n            flex: 0 0 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-md-11 {\n    -webkit-box-flex: 0;\n            flex: 0 0 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-md-12 {\n    -webkit-box-flex: 0;\n            flex: 0 0 100%;\n    max-width: 100%;\n  }\n\n  .order-md-first {\n    -webkit-box-ordinal-group: 0;\n            order: -1;\n  }\n\n  .order-md-last {\n    -webkit-box-ordinal-group: 14;\n            order: 13;\n  }\n\n  .order-md-0 {\n    -webkit-box-ordinal-group: 1;\n            order: 0;\n  }\n\n  .order-md-1 {\n    -webkit-box-ordinal-group: 2;\n            order: 1;\n  }\n\n  .order-md-2 {\n    -webkit-box-ordinal-group: 3;\n            order: 2;\n  }\n\n  .order-md-3 {\n    -webkit-box-ordinal-group: 4;\n            order: 3;\n  }\n\n  .order-md-4 {\n    -webkit-box-ordinal-group: 5;\n            order: 4;\n  }\n\n  .order-md-5 {\n    -webkit-box-ordinal-group: 6;\n            order: 5;\n  }\n\n  .order-md-6 {\n    -webkit-box-ordinal-group: 7;\n            order: 6;\n  }\n\n  .order-md-7 {\n    -webkit-box-ordinal-group: 8;\n            order: 7;\n  }\n\n  .order-md-8 {\n    -webkit-box-ordinal-group: 9;\n            order: 8;\n  }\n\n  .order-md-9 {\n    -webkit-box-ordinal-group: 10;\n            order: 9;\n  }\n\n  .order-md-10 {\n    -webkit-box-ordinal-group: 11;\n            order: 10;\n  }\n\n  .order-md-11 {\n    -webkit-box-ordinal-group: 12;\n            order: 11;\n  }\n\n  .order-md-12 {\n    -webkit-box-ordinal-group: 13;\n            order: 12;\n  }\n\n  .offset-md-0 {\n    margin-left: 0;\n  }\n\n  .offset-md-1 {\n    margin-left: 8.3333333333%;\n  }\n\n  .offset-md-2 {\n    margin-left: 16.6666666667%;\n  }\n\n  .offset-md-3 {\n    margin-left: 25%;\n  }\n\n  .offset-md-4 {\n    margin-left: 33.3333333333%;\n  }\n\n  .offset-md-5 {\n    margin-left: 41.6666666667%;\n  }\n\n  .offset-md-6 {\n    margin-left: 50%;\n  }\n\n  .offset-md-7 {\n    margin-left: 58.3333333333%;\n  }\n\n  .offset-md-8 {\n    margin-left: 66.6666666667%;\n  }\n\n  .offset-md-9 {\n    margin-left: 75%;\n  }\n\n  .offset-md-10 {\n    margin-left: 83.3333333333%;\n  }\n\n  .offset-md-11 {\n    margin-left: 91.6666666667%;\n  }\n}\n@media (min-width: 992px) {\n  .col-lg {\n    flex-basis: 0;\n    -webkit-box-flex: 1;\n            flex-grow: 1;\n    max-width: 100%;\n  }\n\n  .col-lg-auto {\n    -webkit-box-flex: 0;\n            flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n\n  .col-lg-1 {\n    -webkit-box-flex: 0;\n            flex: 0 0 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-lg-2 {\n    -webkit-box-flex: 0;\n            flex: 0 0 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-lg-3 {\n    -webkit-box-flex: 0;\n            flex: 0 0 25%;\n    max-width: 25%;\n  }\n\n  .col-lg-4 {\n    -webkit-box-flex: 0;\n            flex: 0 0 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-lg-5 {\n    -webkit-box-flex: 0;\n            flex: 0 0 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-lg-6 {\n    -webkit-box-flex: 0;\n            flex: 0 0 50%;\n    max-width: 50%;\n  }\n\n  .col-lg-7 {\n    -webkit-box-flex: 0;\n            flex: 0 0 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-lg-8 {\n    -webkit-box-flex: 0;\n            flex: 0 0 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-lg-9 {\n    -webkit-box-flex: 0;\n            flex: 0 0 75%;\n    max-width: 75%;\n  }\n\n  .col-lg-10 {\n    -webkit-box-flex: 0;\n            flex: 0 0 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-lg-11 {\n    -webkit-box-flex: 0;\n            flex: 0 0 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-lg-12 {\n    -webkit-box-flex: 0;\n            flex: 0 0 100%;\n    max-width: 100%;\n  }\n\n  .order-lg-first {\n    -webkit-box-ordinal-group: 0;\n            order: -1;\n  }\n\n  .order-lg-last {\n    -webkit-box-ordinal-group: 14;\n            order: 13;\n  }\n\n  .order-lg-0 {\n    -webkit-box-ordinal-group: 1;\n            order: 0;\n  }\n\n  .order-lg-1 {\n    -webkit-box-ordinal-group: 2;\n            order: 1;\n  }\n\n  .order-lg-2 {\n    -webkit-box-ordinal-group: 3;\n            order: 2;\n  }\n\n  .order-lg-3 {\n    -webkit-box-ordinal-group: 4;\n            order: 3;\n  }\n\n  .order-lg-4 {\n    -webkit-box-ordinal-group: 5;\n            order: 4;\n  }\n\n  .order-lg-5 {\n    -webkit-box-ordinal-group: 6;\n            order: 5;\n  }\n\n  .order-lg-6 {\n    -webkit-box-ordinal-group: 7;\n            order: 6;\n  }\n\n  .order-lg-7 {\n    -webkit-box-ordinal-group: 8;\n            order: 7;\n  }\n\n  .order-lg-8 {\n    -webkit-box-ordinal-group: 9;\n            order: 8;\n  }\n\n  .order-lg-9 {\n    -webkit-box-ordinal-group: 10;\n            order: 9;\n  }\n\n  .order-lg-10 {\n    -webkit-box-ordinal-group: 11;\n            order: 10;\n  }\n\n  .order-lg-11 {\n    -webkit-box-ordinal-group: 12;\n            order: 11;\n  }\n\n  .order-lg-12 {\n    -webkit-box-ordinal-group: 13;\n            order: 12;\n  }\n\n  .offset-lg-0 {\n    margin-left: 0;\n  }\n\n  .offset-lg-1 {\n    margin-left: 8.3333333333%;\n  }\n\n  .offset-lg-2 {\n    margin-left: 16.6666666667%;\n  }\n\n  .offset-lg-3 {\n    margin-left: 25%;\n  }\n\n  .offset-lg-4 {\n    margin-left: 33.3333333333%;\n  }\n\n  .offset-lg-5 {\n    margin-left: 41.6666666667%;\n  }\n\n  .offset-lg-6 {\n    margin-left: 50%;\n  }\n\n  .offset-lg-7 {\n    margin-left: 58.3333333333%;\n  }\n\n  .offset-lg-8 {\n    margin-left: 66.6666666667%;\n  }\n\n  .offset-lg-9 {\n    margin-left: 75%;\n  }\n\n  .offset-lg-10 {\n    margin-left: 83.3333333333%;\n  }\n\n  .offset-lg-11 {\n    margin-left: 91.6666666667%;\n  }\n}\n@media (min-width: 1200px) {\n  .col-xl {\n    flex-basis: 0;\n    -webkit-box-flex: 1;\n            flex-grow: 1;\n    max-width: 100%;\n  }\n\n  .col-xl-auto {\n    -webkit-box-flex: 0;\n            flex: 0 0 auto;\n    width: auto;\n    max-width: 100%;\n  }\n\n  .col-xl-1 {\n    -webkit-box-flex: 0;\n            flex: 0 0 8.3333333333%;\n    max-width: 8.3333333333%;\n  }\n\n  .col-xl-2 {\n    -webkit-box-flex: 0;\n            flex: 0 0 16.6666666667%;\n    max-width: 16.6666666667%;\n  }\n\n  .col-xl-3 {\n    -webkit-box-flex: 0;\n            flex: 0 0 25%;\n    max-width: 25%;\n  }\n\n  .col-xl-4 {\n    -webkit-box-flex: 0;\n            flex: 0 0 33.3333333333%;\n    max-width: 33.3333333333%;\n  }\n\n  .col-xl-5 {\n    -webkit-box-flex: 0;\n            flex: 0 0 41.6666666667%;\n    max-width: 41.6666666667%;\n  }\n\n  .col-xl-6 {\n    -webkit-box-flex: 0;\n            flex: 0 0 50%;\n    max-width: 50%;\n  }\n\n  .col-xl-7 {\n    -webkit-box-flex: 0;\n            flex: 0 0 58.3333333333%;\n    max-width: 58.3333333333%;\n  }\n\n  .col-xl-8 {\n    -webkit-box-flex: 0;\n            flex: 0 0 66.6666666667%;\n    max-width: 66.6666666667%;\n  }\n\n  .col-xl-9 {\n    -webkit-box-flex: 0;\n            flex: 0 0 75%;\n    max-width: 75%;\n  }\n\n  .col-xl-10 {\n    -webkit-box-flex: 0;\n            flex: 0 0 83.3333333333%;\n    max-width: 83.3333333333%;\n  }\n\n  .col-xl-11 {\n    -webkit-box-flex: 0;\n            flex: 0 0 91.6666666667%;\n    max-width: 91.6666666667%;\n  }\n\n  .col-xl-12 {\n    -webkit-box-flex: 0;\n            flex: 0 0 100%;\n    max-width: 100%;\n  }\n\n  .order-xl-first {\n    -webkit-box-ordinal-group: 0;\n            order: -1;\n  }\n\n  .order-xl-last {\n    -webkit-box-ordinal-group: 14;\n            order: 13;\n  }\n\n  .order-xl-0 {\n    -webkit-box-ordinal-group: 1;\n            order: 0;\n  }\n\n  .order-xl-1 {\n    -webkit-box-ordinal-group: 2;\n            order: 1;\n  }\n\n  .order-xl-2 {\n    -webkit-box-ordinal-group: 3;\n            order: 2;\n  }\n\n  .order-xl-3 {\n    -webkit-box-ordinal-group: 4;\n            order: 3;\n  }\n\n  .order-xl-4 {\n    -webkit-box-ordinal-group: 5;\n            order: 4;\n  }\n\n  .order-xl-5 {\n    -webkit-box-ordinal-group: 6;\n            order: 5;\n  }\n\n  .order-xl-6 {\n    -webkit-box-ordinal-group: 7;\n            order: 6;\n  }\n\n  .order-xl-7 {\n    -webkit-box-ordinal-group: 8;\n            order: 7;\n  }\n\n  .order-xl-8 {\n    -webkit-box-ordinal-group: 9;\n            order: 8;\n  }\n\n  .order-xl-9 {\n    -webkit-box-ordinal-group: 10;\n            order: 9;\n  }\n\n  .order-xl-10 {\n    -webkit-box-ordinal-group: 11;\n            order: 10;\n  }\n\n  .order-xl-11 {\n    -webkit-box-ordinal-group: 12;\n            order: 11;\n  }\n\n  .order-xl-12 {\n    -webkit-box-ordinal-group: 13;\n            order: 12;\n  }\n\n  .offset-xl-0 {\n    margin-left: 0;\n  }\n\n  .offset-xl-1 {\n    margin-left: 8.3333333333%;\n  }\n\n  .offset-xl-2 {\n    margin-left: 16.6666666667%;\n  }\n\n  .offset-xl-3 {\n    margin-left: 25%;\n  }\n\n  .offset-xl-4 {\n    margin-left: 33.3333333333%;\n  }\n\n  .offset-xl-5 {\n    margin-left: 41.6666666667%;\n  }\n\n  .offset-xl-6 {\n    margin-left: 50%;\n  }\n\n  .offset-xl-7 {\n    margin-left: 58.3333333333%;\n  }\n\n  .offset-xl-8 {\n    margin-left: 66.6666666667%;\n  }\n\n  .offset-xl-9 {\n    margin-left: 75%;\n  }\n\n  .offset-xl-10 {\n    margin-left: 83.3333333333%;\n  }\n\n  .offset-xl-11 {\n    margin-left: 91.6666666667%;\n  }\n}\n.table {\n  width: 100%;\n  margin-bottom: 1rem;\n  color: #495057;\n}\n.table th,\n.table td {\n  padding: 0.75rem;\n  vertical-align: top;\n  border-top: 1px solid #dee2e6;\n}\n.table thead th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #dee2e6;\n}\n.table tbody + tbody {\n  border-top: 2px solid #dee2e6;\n}\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem;\n}\n\n.table-bordered {\n  border: 1px solid #dee2e6;\n}\n.table-bordered th,\n.table-bordered td {\n  border: 1px solid #dee2e6;\n}\n.table-bordered thead th,\n.table-bordered thead td {\n  border-bottom-width: 2px;\n}\n\n.table-borderless th,\n.table-borderless td,\n.table-borderless thead th,\n.table-borderless tbody + tbody {\n  border: 0;\n}\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.table-hover tbody tr:hover {\n  color: #495057;\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-primary,\n.table-primary > th,\n.table-primary > td {\n  background-color: #c5e6f8;\n}\n.table-primary th,\n.table-primary td,\n.table-primary thead th,\n.table-primary tbody + tbody {\n  border-color: #93d0f3;\n}\n\n.table-hover .table-primary:hover {\n  background-color: #aedcf5;\n}\n.table-hover .table-primary:hover > td,\n.table-hover .table-primary:hover > th {\n  background-color: #aedcf5;\n}\n\n.table-secondary,\n.table-secondary > th,\n.table-secondary > td {\n  background-color: #f9fafb;\n}\n.table-secondary th,\n.table-secondary td,\n.table-secondary thead th,\n.table-secondary tbody + tbody {\n  border-color: #f4f5f7;\n}\n\n.table-hover .table-secondary:hover {\n  background-color: #eaedf1;\n}\n.table-hover .table-secondary:hover > td,\n.table-hover .table-secondary:hover > th {\n  background-color: #eaedf1;\n}\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #d8e7c8;\n}\n.table-success th,\n.table-success td,\n.table-success thead th,\n.table-success tbody + tbody {\n  border-color: #b6d298;\n}\n\n.table-hover .table-success:hover {\n  background-color: #cbdfb6;\n}\n.table-hover .table-success:hover > td,\n.table-hover .table-success:hover > th {\n  background-color: #cbdfb6;\n}\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #b8c8d8;\n}\n.table-info th,\n.table-info td,\n.table-info thead th,\n.table-info tbody + tbody {\n  border-color: #7c9ab6;\n}\n\n.table-hover .table-info:hover {\n  background-color: #a8bbcf;\n}\n.table-hover .table-info:hover > td,\n.table-hover .table-info:hover > th {\n  background-color: #a8bbcf;\n}\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #f5d0b8;\n}\n.table-warning th,\n.table-warning td,\n.table-warning thead th,\n.table-warning tbody + tbody {\n  border-color: #eda77a;\n}\n\n.table-hover .table-warning:hover {\n  background-color: #f2c1a2;\n}\n.table-hover .table-warning:hover > td,\n.table-hover .table-warning:hover > th {\n  background-color: #f2c1a2;\n}\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #efbfc1;\n}\n.table-danger th,\n.table-danger td,\n.table-danger thead th,\n.table-danger tbody + tbody {\n  border-color: #e2898c;\n}\n\n.table-hover .table-danger:hover {\n  background-color: #eaabad;\n}\n.table-hover .table-danger:hover > td,\n.table-hover .table-danger:hover > th {\n  background-color: #eaabad;\n}\n\n.table-light,\n.table-light > th,\n.table-light > td {\n  background-color: #fdfdfe;\n}\n.table-light th,\n.table-light td,\n.table-light thead th,\n.table-light tbody + tbody {\n  border-color: #fbfcfc;\n}\n\n.table-hover .table-light:hover {\n  background-color: #ececf6;\n}\n.table-hover .table-light:hover > td,\n.table-hover .table-light:hover > th {\n  background-color: #ececf6;\n}\n\n.table-dark,\n.table-dark > th,\n.table-dark > td {\n  background-color: #c6c8ca;\n}\n.table-dark th,\n.table-dark td,\n.table-dark thead th,\n.table-dark tbody + tbody {\n  border-color: #95999c;\n}\n\n.table-hover .table-dark:hover {\n  background-color: #b9bbbe;\n}\n.table-hover .table-dark:hover > td,\n.table-hover .table-dark:hover > th {\n  background-color: #b9bbbe;\n}\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n.table-hover .table-active:hover > td,\n.table-hover .table-active:hover > th {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table .thead-dark th {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #454d55;\n}\n.table .thead-light th {\n  color: #495057;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n\n.table-dark {\n  color: #fff;\n  background-color: #343a40;\n}\n.table-dark th,\n.table-dark td,\n.table-dark thead th {\n  border-color: #454d55;\n}\n.table-dark.table-bordered {\n  border: 0;\n}\n.table-dark.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.table-dark.table-hover tbody tr:hover {\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.075);\n}\n\n@media (max-width: 575.98px) {\n  .table-responsive-sm {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  .table-responsive-sm > .table-bordered {\n    border: 0;\n  }\n}\n@media (max-width: 767.98px) {\n  .table-responsive-md {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  .table-responsive-md > .table-bordered {\n    border: 0;\n  }\n}\n@media (max-width: 991.98px) {\n  .table-responsive-lg {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  .table-responsive-lg > .table-bordered {\n    border: 0;\n  }\n}\n@media (max-width: 1199.98px) {\n  .table-responsive-xl {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n  .table-responsive-xl > .table-bordered {\n    border: 0;\n  }\n}\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.table-responsive > .table-bordered {\n  border: 0;\n}\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-control {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.form-control::-ms-expand {\n  background-color: transparent;\n  border: 0;\n}\n.form-control:focus {\n  color: #495057;\n  background-color: #fff;\n  border-color: #a1d6f4;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n.form-control::-webkit-input-placeholder {\n  color: #868e96;\n  opacity: 1;\n}\n.form-control::-moz-placeholder {\n  color: #868e96;\n  opacity: 1;\n}\n.form-control:-ms-input-placeholder {\n  color: #868e96;\n  opacity: 1;\n}\n.form-control::-ms-input-placeholder {\n  color: #868e96;\n  opacity: 1;\n}\n.form-control::placeholder {\n  color: #868e96;\n  opacity: 1;\n}\n.form-control:disabled, .form-control[readonly] {\n  background-color: #e9ecef;\n  opacity: 1;\n}\n\nselect.form-control:focus::-ms-value {\n  color: #495057;\n  background-color: #fff;\n}\n\n.form-control-file,\n.form-control-range {\n  display: block;\n  width: 100%;\n}\n\n.col-form-label {\n  padding-top: calc(0.375rem + 1px);\n  padding-bottom: calc(0.375rem + 1px);\n  margin-bottom: 0;\n  font-size: inherit;\n  line-height: 1.5;\n}\n\n.col-form-label-lg {\n  padding-top: calc(0.5rem + 1px);\n  padding-bottom: calc(0.5rem + 1px);\n  font-size: 1.25rem;\n  line-height: 1.5;\n}\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem + 1px);\n  padding-bottom: calc(0.25rem + 1px);\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n\n.form-control-plaintext {\n  display: block;\n  width: 100%;\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  margin-bottom: 0;\n  line-height: 1.5;\n  color: #495057;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: 1px 0;\n}\n.form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.form-control-sm {\n  height: calc(1.5em + 0.5rem + 2px);\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem;\n}\n\n.form-control-lg {\n  height: calc(1.5em + 1rem + 2px);\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n}\n\nselect.form-control[size], select.form-control[multiple] {\n  height: auto;\n}\n\ntextarea.form-control {\n  height: auto;\n}\n\n.form-group {\n  margin-bottom: 1rem;\n}\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem;\n}\n\n.form-row {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -5px;\n  margin-left: -5px;\n}\n.form-row > .col,\n.form-row > [class*=col-] {\n  padding-right: 5px;\n  padding-left: 5px;\n}\n\n.form-check {\n  position: relative;\n  display: block;\n  padding-left: 1.25rem;\n}\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.3rem;\n  margin-left: -1.25rem;\n}\n.form-check-input:disabled ~ .form-check-label {\n  color: #868e96;\n}\n\n.form-check-label {\n  margin-bottom: 0;\n}\n\n.form-check-inline {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  -webkit-box-align: center;\n          align-items: center;\n  padding-left: 0;\n  margin-right: 0.75rem;\n}\n.form-check-inline .form-check-input {\n  position: static;\n  margin-top: 0;\n  margin-right: 0.3125rem;\n  margin-left: 0;\n}\n\n.valid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #73A839;\n}\n\n.valid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: 0.1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(115, 168, 57, 0.9);\n  border-radius: 0.25rem;\n}\n\n.was-validated .form-control:valid, .form-control.is-valid {\n  border-color: #73A839;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2373A839' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: center right calc(0.375em + 0.1875rem);\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n.was-validated .form-control:valid:focus, .form-control.is-valid:focus {\n  border-color: #73A839;\n  box-shadow: 0 0 0 0.2rem rgba(115, 168, 57, 0.25);\n}\n.was-validated .form-control:valid ~ .valid-feedback,\n.was-validated .form-control:valid ~ .valid-tooltip, .form-control.is-valid ~ .valid-feedback,\n.form-control.is-valid ~ .valid-tooltip {\n  display: block;\n}\n\n.was-validated textarea.form-control:valid, textarea.form-control.is-valid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);\n}\n\n.was-validated .custom-select:valid, .custom-select.is-valid {\n  border-color: #73A839;\n  padding-right: calc((1em + 0.75rem) * 3 / 4 + 1.75rem);\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px, url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2373A839' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n.was-validated .custom-select:valid:focus, .custom-select.is-valid:focus {\n  border-color: #73A839;\n  box-shadow: 0 0 0 0.2rem rgba(115, 168, 57, 0.25);\n}\n.was-validated .custom-select:valid ~ .valid-feedback,\n.was-validated .custom-select:valid ~ .valid-tooltip, .custom-select.is-valid ~ .valid-feedback,\n.custom-select.is-valid ~ .valid-tooltip {\n  display: block;\n}\n\n.was-validated .form-control-file:valid ~ .valid-feedback,\n.was-validated .form-control-file:valid ~ .valid-tooltip, .form-control-file.is-valid ~ .valid-feedback,\n.form-control-file.is-valid ~ .valid-tooltip {\n  display: block;\n}\n\n.was-validated .form-check-input:valid ~ .form-check-label, .form-check-input.is-valid ~ .form-check-label {\n  color: #73A839;\n}\n.was-validated .form-check-input:valid ~ .valid-feedback,\n.was-validated .form-check-input:valid ~ .valid-tooltip, .form-check-input.is-valid ~ .valid-feedback,\n.form-check-input.is-valid ~ .valid-tooltip {\n  display: block;\n}\n\n.was-validated .custom-control-input:valid ~ .custom-control-label, .custom-control-input.is-valid ~ .custom-control-label {\n  color: #73A839;\n}\n.was-validated .custom-control-input:valid ~ .custom-control-label::before, .custom-control-input.is-valid ~ .custom-control-label::before {\n  border-color: #73A839;\n}\n.was-validated .custom-control-input:valid ~ .valid-feedback,\n.was-validated .custom-control-input:valid ~ .valid-tooltip, .custom-control-input.is-valid ~ .valid-feedback,\n.custom-control-input.is-valid ~ .valid-tooltip {\n  display: block;\n}\n.was-validated .custom-control-input:valid:checked ~ .custom-control-label::before, .custom-control-input.is-valid:checked ~ .custom-control-label::before {\n  border-color: #8dc450;\n  background-color: #8dc450;\n}\n.was-validated .custom-control-input:valid:focus ~ .custom-control-label::before, .custom-control-input.is-valid:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(115, 168, 57, 0.25);\n}\n.was-validated .custom-control-input:valid:focus:not(:checked) ~ .custom-control-label::before, .custom-control-input.is-valid:focus:not(:checked) ~ .custom-control-label::before {\n  border-color: #73A839;\n}\n\n.was-validated .custom-file-input:valid ~ .custom-file-label, .custom-file-input.is-valid ~ .custom-file-label {\n  border-color: #73A839;\n}\n.was-validated .custom-file-input:valid ~ .valid-feedback,\n.was-validated .custom-file-input:valid ~ .valid-tooltip, .custom-file-input.is-valid ~ .valid-feedback,\n.custom-file-input.is-valid ~ .valid-tooltip {\n  display: block;\n}\n.was-validated .custom-file-input:valid:focus ~ .custom-file-label, .custom-file-input.is-valid:focus ~ .custom-file-label {\n  border-color: #73A839;\n  box-shadow: 0 0 0 0.2rem rgba(115, 168, 57, 0.25);\n}\n\n.invalid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #C71C22;\n}\n\n.invalid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: 0.1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(199, 28, 34, 0.9);\n  border-radius: 0.25rem;\n}\n\n.was-validated .form-control:invalid, .form-control.is-invalid {\n  border-color: #C71C22;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23C71C22' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23C71C22' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center right calc(0.375em + 0.1875rem);\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n.was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {\n  border-color: #C71C22;\n  box-shadow: 0 0 0 0.2rem rgba(199, 28, 34, 0.25);\n}\n.was-validated .form-control:invalid ~ .invalid-feedback,\n.was-validated .form-control:invalid ~ .invalid-tooltip, .form-control.is-invalid ~ .invalid-feedback,\n.form-control.is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n\n.was-validated textarea.form-control:invalid, textarea.form-control.is-invalid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);\n}\n\n.was-validated .custom-select:invalid, .custom-select.is-invalid {\n  border-color: #C71C22;\n  padding-right: calc((1em + 0.75rem) * 3 / 4 + 1.75rem);\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px, url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23C71C22' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23C71C22' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E\") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n.was-validated .custom-select:invalid:focus, .custom-select.is-invalid:focus {\n  border-color: #C71C22;\n  box-shadow: 0 0 0 0.2rem rgba(199, 28, 34, 0.25);\n}\n.was-validated .custom-select:invalid ~ .invalid-feedback,\n.was-validated .custom-select:invalid ~ .invalid-tooltip, .custom-select.is-invalid ~ .invalid-feedback,\n.custom-select.is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n\n.was-validated .form-control-file:invalid ~ .invalid-feedback,\n.was-validated .form-control-file:invalid ~ .invalid-tooltip, .form-control-file.is-invalid ~ .invalid-feedback,\n.form-control-file.is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n\n.was-validated .form-check-input:invalid ~ .form-check-label, .form-check-input.is-invalid ~ .form-check-label {\n  color: #C71C22;\n}\n.was-validated .form-check-input:invalid ~ .invalid-feedback,\n.was-validated .form-check-input:invalid ~ .invalid-tooltip, .form-check-input.is-invalid ~ .invalid-feedback,\n.form-check-input.is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n\n.was-validated .custom-control-input:invalid ~ .custom-control-label, .custom-control-input.is-invalid ~ .custom-control-label {\n  color: #C71C22;\n}\n.was-validated .custom-control-input:invalid ~ .custom-control-label::before, .custom-control-input.is-invalid ~ .custom-control-label::before {\n  border-color: #C71C22;\n}\n.was-validated .custom-control-input:invalid ~ .invalid-feedback,\n.was-validated .custom-control-input:invalid ~ .invalid-tooltip, .custom-control-input.is-invalid ~ .invalid-feedback,\n.custom-control-input.is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n.was-validated .custom-control-input:invalid:checked ~ .custom-control-label::before, .custom-control-input.is-invalid:checked ~ .custom-control-label::before {\n  border-color: #e2343a;\n  background-color: #e2343a;\n}\n.was-validated .custom-control-input:invalid:focus ~ .custom-control-label::before, .custom-control-input.is-invalid:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(199, 28, 34, 0.25);\n}\n.was-validated .custom-control-input:invalid:focus:not(:checked) ~ .custom-control-label::before, .custom-control-input.is-invalid:focus:not(:checked) ~ .custom-control-label::before {\n  border-color: #C71C22;\n}\n\n.was-validated .custom-file-input:invalid ~ .custom-file-label, .custom-file-input.is-invalid ~ .custom-file-label {\n  border-color: #C71C22;\n}\n.was-validated .custom-file-input:invalid ~ .invalid-feedback,\n.was-validated .custom-file-input:invalid ~ .invalid-tooltip, .custom-file-input.is-invalid ~ .invalid-feedback,\n.custom-file-input.is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n.was-validated .custom-file-input:invalid:focus ~ .custom-file-label, .custom-file-input.is-invalid:focus ~ .custom-file-label {\n  border-color: #C71C22;\n  box-shadow: 0 0 0 0.2rem rgba(199, 28, 34, 0.25);\n}\n\n.form-inline {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.form-inline .form-check {\n  width: 100%;\n}\n@media (min-width: 576px) {\n  .form-inline label {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n            justify-content: center;\n    margin-bottom: 0;\n  }\n  .form-inline .form-group {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-flex: 0;\n            flex: 0 0 auto;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-flow: row wrap;\n    -webkit-box-align: center;\n            align-items: center;\n    margin-bottom: 0;\n  }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline .form-control-plaintext {\n    display: inline-block;\n  }\n  .form-inline .input-group,\n.form-inline .custom-select {\n    width: auto;\n  }\n  .form-inline .form-check {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n            justify-content: center;\n    width: auto;\n    padding-left: 0;\n  }\n  .form-inline .form-check-input {\n    position: relative;\n    flex-shrink: 0;\n    margin-top: 0;\n    margin-right: 0.25rem;\n    margin-left: 0;\n  }\n  .form-inline .custom-control {\n    -webkit-box-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n            justify-content: center;\n  }\n  .form-inline .custom-control-label {\n    margin-bottom: 0;\n  }\n}\n\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  color: #495057;\n  text-align: center;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: transparent;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .btn {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.btn:hover {\n  color: #495057;\n  text-decoration: none;\n}\n.btn:focus, .btn.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n.btn.disabled, .btn:disabled {\n  opacity: 0.65;\n}\na.btn.disabled,\nfieldset:disabled a.btn {\n  pointer-events: none;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #2FA4E7;\n  border-color: #2FA4E7;\n}\n.btn-primary:hover {\n  color: #fff;\n  background-color: #1992d7;\n  border-color: #178acc;\n}\n.btn-primary:focus, .btn-primary.focus {\n  box-shadow: 0 0 0 0.2rem rgba(78, 178, 235, 0.5);\n}\n.btn-primary.disabled, .btn-primary:disabled {\n  color: #fff;\n  background-color: #2FA4E7;\n  border-color: #2FA4E7;\n}\n.btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active, .show > .btn-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #178acc;\n  border-color: #1682c0;\n}\n.btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-primary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(78, 178, 235, 0.5);\n}\n\n.btn-secondary {\n  color: #212529;\n  background-color: #e9ecef;\n  border-color: #e9ecef;\n}\n.btn-secondary:hover {\n  color: #212529;\n  background-color: #d3d9df;\n  border-color: #cbd3da;\n}\n.btn-secondary:focus, .btn-secondary.focus {\n  box-shadow: 0 0 0 0.2rem rgba(203, 206, 209, 0.5);\n}\n.btn-secondary.disabled, .btn-secondary:disabled {\n  color: #212529;\n  background-color: #e9ecef;\n  border-color: #e9ecef;\n}\n.btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active, .show > .btn-secondary.dropdown-toggle {\n  color: #212529;\n  background-color: #cbd3da;\n  border-color: #c4ccd4;\n}\n.btn-secondary:not(:disabled):not(.disabled):active:focus, .btn-secondary:not(:disabled):not(.disabled).active:focus, .show > .btn-secondary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(203, 206, 209, 0.5);\n}\n\n.btn-success {\n  color: #fff;\n  background-color: #73A839;\n  border-color: #73A839;\n}\n.btn-success:hover {\n  color: #fff;\n  background-color: #5f8b2f;\n  border-color: #59822c;\n}\n.btn-success:focus, .btn-success.focus {\n  box-shadow: 0 0 0 0.2rem rgba(136, 181, 87, 0.5);\n}\n.btn-success.disabled, .btn-success:disabled {\n  color: #fff;\n  background-color: #73A839;\n  border-color: #73A839;\n}\n.btn-success:not(:disabled):not(.disabled):active, .btn-success:not(:disabled):not(.disabled).active, .show > .btn-success.dropdown-toggle {\n  color: #fff;\n  background-color: #59822c;\n  border-color: #527829;\n}\n.btn-success:not(:disabled):not(.disabled):active:focus, .btn-success:not(:disabled):not(.disabled).active:focus, .show > .btn-success.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(136, 181, 87, 0.5);\n}\n\n.btn-info {\n  color: #fff;\n  background-color: #033C73;\n  border-color: #033C73;\n}\n.btn-info:hover {\n  color: #fff;\n  background-color: #02294e;\n  border-color: #022241;\n}\n.btn-info:focus, .btn-info.focus {\n  box-shadow: 0 0 0 0.2rem rgba(41, 89, 136, 0.5);\n}\n.btn-info.disabled, .btn-info:disabled {\n  color: #fff;\n  background-color: #033C73;\n  border-color: #033C73;\n}\n.btn-info:not(:disabled):not(.disabled):active, .btn-info:not(:disabled):not(.disabled).active, .show > .btn-info.dropdown-toggle {\n  color: #fff;\n  background-color: #022241;\n  border-color: #011c35;\n}\n.btn-info:not(:disabled):not(.disabled):active:focus, .btn-info:not(:disabled):not(.disabled).active:focus, .show > .btn-info.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(41, 89, 136, 0.5);\n}\n\n.btn-warning {\n  color: #fff;\n  background-color: #DD5600;\n  border-color: #DD5600;\n}\n.btn-warning:hover {\n  color: #fff;\n  background-color: #b74700;\n  border-color: #aa4200;\n}\n.btn-warning:focus, .btn-warning.focus {\n  box-shadow: 0 0 0 0.2rem rgba(226, 111, 38, 0.5);\n}\n.btn-warning.disabled, .btn-warning:disabled {\n  color: #fff;\n  background-color: #DD5600;\n  border-color: #DD5600;\n}\n.btn-warning:not(:disabled):not(.disabled):active, .btn-warning:not(:disabled):not(.disabled).active, .show > .btn-warning.dropdown-toggle {\n  color: #fff;\n  background-color: #aa4200;\n  border-color: #9d3d00;\n}\n.btn-warning:not(:disabled):not(.disabled):active:focus, .btn-warning:not(:disabled):not(.disabled).active:focus, .show > .btn-warning.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(226, 111, 38, 0.5);\n}\n\n.btn-danger {\n  color: #fff;\n  background-color: #C71C22;\n  border-color: #C71C22;\n}\n.btn-danger:hover {\n  color: #fff;\n  background-color: #a5171c;\n  border-color: #9a161a;\n}\n.btn-danger:focus, .btn-danger.focus {\n  box-shadow: 0 0 0 0.2rem rgba(207, 62, 67, 0.5);\n}\n.btn-danger.disabled, .btn-danger:disabled {\n  color: #fff;\n  background-color: #C71C22;\n  border-color: #C71C22;\n}\n.btn-danger:not(:disabled):not(.disabled):active, .btn-danger:not(:disabled):not(.disabled).active, .show > .btn-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #9a161a;\n  border-color: #8f1418;\n}\n.btn-danger:not(:disabled):not(.disabled):active:focus, .btn-danger:not(:disabled):not(.disabled).active:focus, .show > .btn-danger.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(207, 62, 67, 0.5);\n}\n\n.btn-light {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-light:hover {\n  color: #212529;\n  background-color: #e2e6ea;\n  border-color: #dae0e5;\n}\n.btn-light:focus, .btn-light.focus {\n  box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5);\n}\n.btn-light.disabled, .btn-light:disabled {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-light:not(:disabled):not(.disabled):active, .btn-light:not(:disabled):not(.disabled).active, .show > .btn-light.dropdown-toggle {\n  color: #212529;\n  background-color: #dae0e5;\n  border-color: #d3d9df;\n}\n.btn-light:not(:disabled):not(.disabled):active:focus, .btn-light:not(:disabled):not(.disabled).active:focus, .show > .btn-light.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5);\n}\n\n.btn-dark {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n.btn-dark:hover {\n  color: #fff;\n  background-color: #23272b;\n  border-color: #1d2124;\n}\n.btn-dark:focus, .btn-dark.focus {\n  box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);\n}\n.btn-dark.disabled, .btn-dark:disabled {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n.btn-dark:not(:disabled):not(.disabled):active, .btn-dark:not(:disabled):not(.disabled).active, .show > .btn-dark.dropdown-toggle {\n  color: #fff;\n  background-color: #1d2124;\n  border-color: #171a1d;\n}\n.btn-dark:not(:disabled):not(.disabled):active:focus, .btn-dark:not(:disabled):not(.disabled).active:focus, .show > .btn-dark.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);\n}\n\n.btn-outline-primary {\n  color: #2FA4E7;\n  border-color: #2FA4E7;\n}\n.btn-outline-primary:hover {\n  color: #fff;\n  background-color: #2FA4E7;\n  border-color: #2FA4E7;\n}\n.btn-outline-primary:focus, .btn-outline-primary.focus {\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.5);\n}\n.btn-outline-primary.disabled, .btn-outline-primary:disabled {\n  color: #2FA4E7;\n  background-color: transparent;\n}\n.btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #2FA4E7;\n  border-color: #2FA4E7;\n}\n.btn-outline-primary:not(:disabled):not(.disabled):active:focus, .btn-outline-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-primary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.5);\n}\n\n.btn-outline-secondary {\n  color: #e9ecef;\n  border-color: #e9ecef;\n}\n.btn-outline-secondary:hover {\n  color: #212529;\n  background-color: #e9ecef;\n  border-color: #e9ecef;\n}\n.btn-outline-secondary:focus, .btn-outline-secondary.focus {\n  box-shadow: 0 0 0 0.2rem rgba(233, 236, 239, 0.5);\n}\n.btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n  color: #e9ecef;\n  background-color: transparent;\n}\n.btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active, .show > .btn-outline-secondary.dropdown-toggle {\n  color: #212529;\n  background-color: #e9ecef;\n  border-color: #e9ecef;\n}\n.btn-outline-secondary:not(:disabled):not(.disabled):active:focus, .btn-outline-secondary:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-secondary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(233, 236, 239, 0.5);\n}\n\n.btn-outline-success {\n  color: #73A839;\n  border-color: #73A839;\n}\n.btn-outline-success:hover {\n  color: #fff;\n  background-color: #73A839;\n  border-color: #73A839;\n}\n.btn-outline-success:focus, .btn-outline-success.focus {\n  box-shadow: 0 0 0 0.2rem rgba(115, 168, 57, 0.5);\n}\n.btn-outline-success.disabled, .btn-outline-success:disabled {\n  color: #73A839;\n  background-color: transparent;\n}\n.btn-outline-success:not(:disabled):not(.disabled):active, .btn-outline-success:not(:disabled):not(.disabled).active, .show > .btn-outline-success.dropdown-toggle {\n  color: #fff;\n  background-color: #73A839;\n  border-color: #73A839;\n}\n.btn-outline-success:not(:disabled):not(.disabled):active:focus, .btn-outline-success:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-success.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(115, 168, 57, 0.5);\n}\n\n.btn-outline-info {\n  color: #033C73;\n  border-color: #033C73;\n}\n.btn-outline-info:hover {\n  color: #fff;\n  background-color: #033C73;\n  border-color: #033C73;\n}\n.btn-outline-info:focus, .btn-outline-info.focus {\n  box-shadow: 0 0 0 0.2rem rgba(3, 60, 115, 0.5);\n}\n.btn-outline-info.disabled, .btn-outline-info:disabled {\n  color: #033C73;\n  background-color: transparent;\n}\n.btn-outline-info:not(:disabled):not(.disabled):active, .btn-outline-info:not(:disabled):not(.disabled).active, .show > .btn-outline-info.dropdown-toggle {\n  color: #fff;\n  background-color: #033C73;\n  border-color: #033C73;\n}\n.btn-outline-info:not(:disabled):not(.disabled):active:focus, .btn-outline-info:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-info.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(3, 60, 115, 0.5);\n}\n\n.btn-outline-warning {\n  color: #DD5600;\n  border-color: #DD5600;\n}\n.btn-outline-warning:hover {\n  color: #fff;\n  background-color: #DD5600;\n  border-color: #DD5600;\n}\n.btn-outline-warning:focus, .btn-outline-warning.focus {\n  box-shadow: 0 0 0 0.2rem rgba(221, 86, 0, 0.5);\n}\n.btn-outline-warning.disabled, .btn-outline-warning:disabled {\n  color: #DD5600;\n  background-color: transparent;\n}\n.btn-outline-warning:not(:disabled):not(.disabled):active, .btn-outline-warning:not(:disabled):not(.disabled).active, .show > .btn-outline-warning.dropdown-toggle {\n  color: #fff;\n  background-color: #DD5600;\n  border-color: #DD5600;\n}\n.btn-outline-warning:not(:disabled):not(.disabled):active:focus, .btn-outline-warning:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-warning.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(221, 86, 0, 0.5);\n}\n\n.btn-outline-danger {\n  color: #C71C22;\n  border-color: #C71C22;\n}\n.btn-outline-danger:hover {\n  color: #fff;\n  background-color: #C71C22;\n  border-color: #C71C22;\n}\n.btn-outline-danger:focus, .btn-outline-danger.focus {\n  box-shadow: 0 0 0 0.2rem rgba(199, 28, 34, 0.5);\n}\n.btn-outline-danger.disabled, .btn-outline-danger:disabled {\n  color: #C71C22;\n  background-color: transparent;\n}\n.btn-outline-danger:not(:disabled):not(.disabled):active, .btn-outline-danger:not(:disabled):not(.disabled).active, .show > .btn-outline-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #C71C22;\n  border-color: #C71C22;\n}\n.btn-outline-danger:not(:disabled):not(.disabled):active:focus, .btn-outline-danger:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-danger.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(199, 28, 34, 0.5);\n}\n\n.btn-outline-light {\n  color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-outline-light:hover {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-outline-light:focus, .btn-outline-light.focus {\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n.btn-outline-light.disabled, .btn-outline-light:disabled {\n  color: #f8f9fa;\n  background-color: transparent;\n}\n.btn-outline-light:not(:disabled):not(.disabled):active, .btn-outline-light:not(:disabled):not(.disabled).active, .show > .btn-outline-light.dropdown-toggle {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-outline-light:not(:disabled):not(.disabled):active:focus, .btn-outline-light:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-light.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n\n.btn-outline-dark {\n  color: #343a40;\n  border-color: #343a40;\n}\n.btn-outline-dark:hover {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n.btn-outline-dark:focus, .btn-outline-dark.focus {\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n.btn-outline-dark.disabled, .btn-outline-dark:disabled {\n  color: #343a40;\n  background-color: transparent;\n}\n.btn-outline-dark:not(:disabled):not(.disabled):active, .btn-outline-dark:not(:disabled):not(.disabled).active, .show > .btn-outline-dark.dropdown-toggle {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n.btn-outline-dark:not(:disabled):not(.disabled):active:focus, .btn-outline-dark:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-dark.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n\n.btn-link {\n  font-weight: 400;\n  color: #2FA4E7;\n  text-decoration: none;\n}\n.btn-link:hover {\n  color: #157ab5;\n  text-decoration: underline;\n}\n.btn-link:focus, .btn-link.focus {\n  text-decoration: underline;\n  box-shadow: none;\n}\n.btn-link:disabled, .btn-link.disabled {\n  color: #868e96;\n  pointer-events: none;\n}\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n}\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem;\n}\n\n.btn-block {\n  display: block;\n  width: 100%;\n}\n.btn-block + .btn-block {\n  margin-top: 0.5rem;\n}\n\ninput[type=submit].btn-block,\ninput[type=reset].btn-block,\ninput[type=button].btn-block {\n  width: 100%;\n}\n\n.fade {\n  -webkit-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n@media (prefers-reduced-motion: reduce) {\n  .fade {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.fade:not(.show) {\n  opacity: 0;\n}\n\n.collapse:not(.show) {\n  display: none;\n}\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition: height 0.35s ease;\n  transition: height 0.35s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .collapsing {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n\n.dropup,\n.dropright,\n.dropdown,\n.dropleft {\n  position: relative;\n}\n\n.dropdown-toggle {\n  white-space: nowrap;\n}\n.dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0;\n  border-left: 0.3em solid transparent;\n}\n.dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #495057;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n}\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0;\n}\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto;\n}\n\n@media (min-width: 576px) {\n  .dropdown-menu-sm-left {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-sm-right {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 768px) {\n  .dropdown-menu-md-left {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-md-right {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 992px) {\n  .dropdown-menu-lg-left {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-lg-right {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 1200px) {\n  .dropdown-menu-xl-left {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-xl-right {\n    right: 0;\n    left: auto;\n  }\n}\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-top: 0;\n  margin-bottom: 0.125rem;\n}\n.dropup .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0.3em solid;\n  border-left: 0.3em solid transparent;\n}\n.dropup .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n\n.dropright .dropdown-menu {\n  top: 0;\n  right: auto;\n  left: 100%;\n  margin-top: 0;\n  margin-left: 0.125rem;\n}\n.dropright .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0;\n  border-bottom: 0.3em solid transparent;\n  border-left: 0.3em solid;\n}\n.dropright .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n.dropright .dropdown-toggle::after {\n  vertical-align: 0;\n}\n\n.dropleft .dropdown-menu {\n  top: 0;\n  right: 100%;\n  left: auto;\n  margin-top: 0;\n  margin-right: 0.125rem;\n}\n.dropleft .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n}\n.dropleft .dropdown-toggle::after {\n  display: none;\n}\n.dropleft .dropdown-toggle::before {\n  display: inline-block;\n  margin-right: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0.3em solid;\n  border-bottom: 0.3em solid transparent;\n}\n.dropleft .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n.dropleft .dropdown-toggle::before {\n  vertical-align: 0;\n}\n\n.dropdown-menu[x-placement^=top], .dropdown-menu[x-placement^=right], .dropdown-menu[x-placement^=bottom], .dropdown-menu[x-placement^=left] {\n  right: auto;\n  bottom: auto;\n}\n\n.dropdown-divider {\n  height: 0;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  border-top: 1px solid #e9ecef;\n}\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 1.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #495057;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0;\n}\n.dropdown-item:hover, .dropdown-item:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #2FA4E7;\n}\n.dropdown-item.active, .dropdown-item:active {\n  color: #fff;\n  text-decoration: none;\n  background-color: #2FA4E7;\n}\n.dropdown-item.disabled, .dropdown-item:disabled {\n  color: #868e96;\n  pointer-events: none;\n  background-color: transparent;\n}\n\n.dropdown-menu.show {\n  display: block;\n}\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #868e96;\n  white-space: nowrap;\n}\n\n.dropdown-item-text {\n  display: block;\n  padding: 0.25rem 1.5rem;\n  color: #495057;\n}\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: -webkit-inline-box;\n  display: inline-flex;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n}\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover {\n  z-index: 1;\n}\n.btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n.btn-group-vertical > .btn:focus,\n.btn-group-vertical > .btn:active,\n.btn-group-vertical > .btn.active {\n  z-index: 1;\n}\n\n.btn-toolbar {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n}\n.btn-toolbar .input-group {\n  width: auto;\n}\n\n.btn-group > .btn:not(:first-child),\n.btn-group > .btn-group:not(:first-child) {\n  margin-left: -1px;\n}\n.btn-group > .btn:not(:last-child):not(.dropdown-toggle),\n.btn-group > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.btn-group > .btn:not(:first-child),\n.btn-group > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.dropdown-toggle-split {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem;\n}\n.dropdown-toggle-split::after, .dropup .dropdown-toggle-split::after, .dropright .dropdown-toggle-split::after {\n  margin-left: 0;\n}\n.dropleft .dropdown-toggle-split::before {\n  margin-right: 0;\n}\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem;\n}\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem;\n}\n\n.btn-group-vertical {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group {\n  width: 100%;\n}\n.btn-group-vertical > .btn:not(:first-child),\n.btn-group-vertical > .btn-group:not(:first-child) {\n  margin-top: -1px;\n}\n.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle),\n.btn-group-vertical > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn:not(:first-child),\n.btn-group-vertical > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group-toggle > .btn,\n.btn-group-toggle > .btn-group > .btn {\n  margin-bottom: 0;\n}\n.btn-group-toggle > .btn input[type=radio],\n.btn-group-toggle > .btn input[type=checkbox],\n.btn-group-toggle > .btn-group > .btn input[type=radio],\n.btn-group-toggle > .btn-group > .btn input[type=checkbox] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n\n.input-group {\n  position: relative;\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  -webkit-box-align: stretch;\n          align-items: stretch;\n  width: 100%;\n}\n.input-group > .form-control,\n.input-group > .form-control-plaintext,\n.input-group > .custom-select,\n.input-group > .custom-file {\n  position: relative;\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  width: 1%;\n  margin-bottom: 0;\n}\n.input-group > .form-control + .form-control,\n.input-group > .form-control + .custom-select,\n.input-group > .form-control + .custom-file,\n.input-group > .form-control-plaintext + .form-control,\n.input-group > .form-control-plaintext + .custom-select,\n.input-group > .form-control-plaintext + .custom-file,\n.input-group > .custom-select + .form-control,\n.input-group > .custom-select + .custom-select,\n.input-group > .custom-select + .custom-file,\n.input-group > .custom-file + .form-control,\n.input-group > .custom-file + .custom-select,\n.input-group > .custom-file + .custom-file {\n  margin-left: -1px;\n}\n.input-group > .form-control:focus,\n.input-group > .custom-select:focus,\n.input-group > .custom-file .custom-file-input:focus ~ .custom-file-label {\n  z-index: 3;\n}\n.input-group > .custom-file .custom-file-input:focus {\n  z-index: 4;\n}\n.input-group > .form-control:not(:last-child),\n.input-group > .custom-select:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.input-group > .form-control:not(:first-child),\n.input-group > .custom-select:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.input-group > .custom-file {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.input-group > .custom-file:not(:last-child) .custom-file-label, .input-group > .custom-file:not(:last-child) .custom-file-label::after {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.input-group > .custom-file:not(:first-child) .custom-file-label {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.input-group-prepend,\n.input-group-append {\n  display: -webkit-box;\n  display: flex;\n}\n.input-group-prepend .btn,\n.input-group-append .btn {\n  position: relative;\n  z-index: 2;\n}\n.input-group-prepend .btn:focus,\n.input-group-append .btn:focus {\n  z-index: 3;\n}\n.input-group-prepend .btn + .btn,\n.input-group-prepend .btn + .input-group-text,\n.input-group-prepend .input-group-text + .input-group-text,\n.input-group-prepend .input-group-text + .btn,\n.input-group-append .btn + .btn,\n.input-group-append .btn + .input-group-text,\n.input-group-append .input-group-text + .input-group-text,\n.input-group-append .input-group-text + .btn {\n  margin-left: -1px;\n}\n\n.input-group-prepend {\n  margin-right: -1px;\n}\n\n.input-group-append {\n  margin-left: -1px;\n}\n\n.input-group-text {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 0.375rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n}\n.input-group-text input[type=radio],\n.input-group-text input[type=checkbox] {\n  margin-top: 0;\n}\n\n.input-group-lg > .form-control:not(textarea),\n.input-group-lg > .custom-select {\n  height: calc(1.5em + 1rem + 2px);\n}\n\n.input-group-lg > .form-control,\n.input-group-lg > .custom-select,\n.input-group-lg > .input-group-prepend > .input-group-text,\n.input-group-lg > .input-group-append > .input-group-text,\n.input-group-lg > .input-group-prepend > .btn,\n.input-group-lg > .input-group-append > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n}\n\n.input-group-sm > .form-control:not(textarea),\n.input-group-sm > .custom-select {\n  height: calc(1.5em + 0.5rem + 2px);\n}\n\n.input-group-sm > .form-control,\n.input-group-sm > .custom-select,\n.input-group-sm > .input-group-prepend > .input-group-text,\n.input-group-sm > .input-group-append > .input-group-text,\n.input-group-sm > .input-group-prepend > .btn,\n.input-group-sm > .input-group-append > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem;\n}\n\n.input-group-lg > .custom-select,\n.input-group-sm > .custom-select {\n  padding-right: 1.75rem;\n}\n\n.input-group > .input-group-prepend > .btn,\n.input-group > .input-group-prepend > .input-group-text,\n.input-group > .input-group-append:not(:last-child) > .btn,\n.input-group > .input-group-append:not(:last-child) > .input-group-text,\n.input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group > .input-group-append:last-child > .input-group-text:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.input-group > .input-group-append > .btn,\n.input-group > .input-group-append > .input-group-text,\n.input-group > .input-group-prepend:not(:first-child) > .btn,\n.input-group > .input-group-prepend:not(:first-child) > .input-group-text,\n.input-group > .input-group-prepend:first-child > .btn:not(:first-child),\n.input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.custom-control {\n  position: relative;\n  display: block;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n}\n\n.custom-control-inline {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  margin-right: 1rem;\n}\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n}\n.custom-control-input:checked ~ .custom-control-label::before {\n  color: #fff;\n  border-color: #2FA4E7;\n  background-color: #2FA4E7;\n}\n.custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {\n  border-color: #a1d6f4;\n}\n.custom-control-input:not(:disabled):active ~ .custom-control-label::before {\n  color: #fff;\n  background-color: #cfeaf9;\n  border-color: #cfeaf9;\n}\n.custom-control-input:disabled ~ .custom-control-label {\n  color: #868e96;\n}\n.custom-control-input:disabled ~ .custom-control-label::before {\n  background-color: #e9ecef;\n}\n\n.custom-control-label {\n  position: relative;\n  margin-bottom: 0;\n  vertical-align: top;\n}\n.custom-control-label::before {\n  position: absolute;\n  top: 0.25rem;\n  left: -1.5rem;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  content: \"\";\n  background-color: #fff;\n  border: #adb5bd solid 1px;\n}\n.custom-control-label::after {\n  position: absolute;\n  top: 0.25rem;\n  left: -1.5rem;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  content: \"\";\n  background: no-repeat 50%/50% 50%;\n}\n\n.custom-checkbox .custom-control-label::before {\n  border-radius: 0.25rem;\n}\n.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e\");\n}\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {\n  border-color: #2FA4E7;\n  background-color: #2FA4E7;\n}\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e\");\n}\n.custom-checkbox .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(47, 164, 231, 0.5);\n}\n.custom-checkbox .custom-control-input:disabled:indeterminate ~ .custom-control-label::before {\n  background-color: rgba(47, 164, 231, 0.5);\n}\n\n.custom-radio .custom-control-label::before {\n  border-radius: 50%;\n}\n.custom-radio .custom-control-input:checked ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\");\n}\n.custom-radio .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(47, 164, 231, 0.5);\n}\n\n.custom-switch {\n  padding-left: 2.25rem;\n}\n.custom-switch .custom-control-label::before {\n  left: -2.25rem;\n  width: 1.75rem;\n  pointer-events: all;\n  border-radius: 0.5rem;\n}\n.custom-switch .custom-control-label::after {\n  top: calc(0.25rem + 2px);\n  left: calc(-2.25rem + 2px);\n  width: calc(1rem - 4px);\n  height: calc(1rem - 4px);\n  background-color: #adb5bd;\n  border-radius: 0.5rem;\n  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;\n  transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .custom-switch .custom-control-label::after {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.custom-switch .custom-control-input:checked ~ .custom-control-label::after {\n  background-color: #fff;\n  -webkit-transform: translateX(0.75rem);\n          transform: translateX(0.75rem);\n}\n.custom-switch .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(47, 164, 231, 0.5);\n}\n\n.custom-select {\n  display: inline-block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  vertical-align: middle;\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n.custom-select:focus {\n  border-color: #a1d6f4;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n.custom-select:focus::-ms-value {\n  color: #495057;\n  background-color: #fff;\n}\n.custom-select[multiple], .custom-select[size]:not([size=\"1\"]) {\n  height: auto;\n  padding-right: 0.75rem;\n  background-image: none;\n}\n.custom-select:disabled {\n  color: #868e96;\n  background-color: #e9ecef;\n}\n.custom-select::-ms-expand {\n  display: none;\n}\n\n.custom-select-sm {\n  height: calc(1.5em + 0.5rem + 2px);\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  font-size: 0.875rem;\n}\n\n.custom-select-lg {\n  height: calc(1.5em + 1rem + 2px);\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  font-size: 1.25rem;\n}\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  margin-bottom: 0;\n}\n\n.custom-file-input {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  margin: 0;\n  opacity: 0;\n}\n.custom-file-input:focus ~ .custom-file-label {\n  border-color: #a1d6f4;\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n.custom-file-input:disabled ~ .custom-file-label {\n  background-color: #e9ecef;\n}\n.custom-file-input:lang(en) ~ .custom-file-label::after {\n  content: \"Browse\";\n}\n.custom-file-input ~ .custom-file-label[data-browse]::after {\n  content: attr(data-browse);\n}\n\n.custom-file-label {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n}\n.custom-file-label::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 3;\n  display: block;\n  height: calc(1.5em + 0.75rem);\n  padding: 0.375rem 0.75rem;\n  line-height: 1.5;\n  color: #495057;\n  content: \"Browse\";\n  background-color: #e9ecef;\n  border-left: inherit;\n  border-radius: 0 0.25rem 0.25rem 0;\n}\n\n.custom-range {\n  width: 100%;\n  height: calc(1rem + 0.4rem);\n  padding: 0;\n  background-color: transparent;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n.custom-range:focus {\n  outline: none;\n}\n.custom-range:focus::-webkit-slider-thumb {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n.custom-range:focus::-moz-range-thumb {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n.custom-range:focus::-ms-thumb {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n.custom-range::-moz-focus-outer {\n  border: 0;\n}\n.custom-range::-webkit-slider-thumb {\n  width: 1rem;\n  height: 1rem;\n  margin-top: -0.25rem;\n  background-color: #2FA4E7;\n  border: 0;\n  border-radius: 1rem;\n  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  -webkit-appearance: none;\n          appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  .custom-range::-webkit-slider-thumb {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.custom-range::-webkit-slider-thumb:active {\n  background-color: #cfeaf9;\n}\n.custom-range::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 0.5rem;\n  color: transparent;\n  cursor: pointer;\n  background-color: #dee2e6;\n  border-color: transparent;\n  border-radius: 1rem;\n}\n.custom-range::-moz-range-thumb {\n  width: 1rem;\n  height: 1rem;\n  background-color: #2FA4E7;\n  border: 0;\n  border-radius: 1rem;\n  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  -moz-appearance: none;\n       appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  .custom-range::-moz-range-thumb {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.custom-range::-moz-range-thumb:active {\n  background-color: #cfeaf9;\n}\n.custom-range::-moz-range-track {\n  width: 100%;\n  height: 0.5rem;\n  color: transparent;\n  cursor: pointer;\n  background-color: #dee2e6;\n  border-color: transparent;\n  border-radius: 1rem;\n}\n.custom-range::-ms-thumb {\n  width: 1rem;\n  height: 1rem;\n  margin-top: 0;\n  margin-right: 0.2rem;\n  margin-left: 0.2rem;\n  background-color: #2FA4E7;\n  border: 0;\n  border-radius: 1rem;\n  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  .custom-range::-ms-thumb {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.custom-range::-ms-thumb:active {\n  background-color: #cfeaf9;\n}\n.custom-range::-ms-track {\n  width: 100%;\n  height: 0.5rem;\n  color: transparent;\n  cursor: pointer;\n  background-color: transparent;\n  border-color: transparent;\n  border-width: 0.5rem;\n}\n.custom-range::-ms-fill-lower {\n  background-color: #dee2e6;\n  border-radius: 1rem;\n}\n.custom-range::-ms-fill-upper {\n  margin-right: 15px;\n  background-color: #dee2e6;\n  border-radius: 1rem;\n}\n.custom-range:disabled::-webkit-slider-thumb {\n  background-color: #adb5bd;\n}\n.custom-range:disabled::-webkit-slider-runnable-track {\n  cursor: default;\n}\n.custom-range:disabled::-moz-range-thumb {\n  background-color: #adb5bd;\n}\n.custom-range:disabled::-moz-range-track {\n  cursor: default;\n}\n.custom-range:disabled::-ms-thumb {\n  background-color: #adb5bd;\n}\n\n.custom-control-label::before,\n.custom-file-label,\n.custom-select {\n  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .custom-control-label::before,\n.custom-file-label,\n.custom-select {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n\n.nav {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n\n.nav-link {\n  display: block;\n  padding: 0.5rem 1rem;\n}\n.nav-link:hover, .nav-link:focus {\n  text-decoration: none;\n}\n.nav-link.disabled {\n  color: #868e96;\n  pointer-events: none;\n  cursor: default;\n}\n\n.nav-tabs {\n  border-bottom: 1px solid #dee2e6;\n}\n.nav-tabs .nav-item {\n  margin-bottom: -1px;\n}\n.nav-tabs .nav-link {\n  border: 1px solid transparent;\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n.nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {\n  border-color: #e9ecef #e9ecef #dee2e6;\n}\n.nav-tabs .nav-link.disabled {\n  color: #868e96;\n  background-color: transparent;\n  border-color: transparent;\n}\n.nav-tabs .nav-link.active,\n.nav-tabs .nav-item.show .nav-link {\n  color: #495057;\n  background-color: #fff;\n  border-color: #dee2e6 #dee2e6 #fff;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem;\n}\n.nav-pills .nav-link.active,\n.nav-pills .show > .nav-link {\n  color: #fff;\n  background-color: #2FA4E7;\n}\n\n.nav-fill .nav-item {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  text-align: center;\n}\n\n.nav-justified .nav-item {\n  flex-basis: 0;\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  text-align: center;\n}\n\n.tab-content > .tab-pane {\n  display: none;\n}\n.tab-content > .active {\n  display: block;\n}\n\n.navbar {\n  position: relative;\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  padding: 0.5rem 1rem;\n}\n.navbar > .container,\n.navbar > .container-fluid {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap;\n}\n.navbar-brand:hover, .navbar-brand:focus {\n  text-decoration: none;\n}\n\n.navbar-nav {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n.navbar-nav .nav-link {\n  padding-right: 0;\n  padding-left: 0;\n}\n.navbar-nav .dropdown-menu {\n  position: static;\n  float: none;\n}\n\n.navbar-text {\n  display: inline-block;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.navbar-collapse {\n  flex-basis: 100%;\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.navbar-toggler {\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background-color: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n.navbar-toggler:hover, .navbar-toggler:focus {\n  text-decoration: none;\n}\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%;\n}\n\n@media (max-width: 575.98px) {\n  .navbar-expand-sm > .container,\n.navbar-expand-sm > .container-fluid {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 576px) {\n  .navbar-expand-sm {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-flow: row nowrap;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .navbar-expand-sm .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-direction: row;\n  }\n  .navbar-expand-sm .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-sm .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-sm > .container,\n.navbar-expand-sm > .container-fluid {\n    flex-wrap: nowrap;\n  }\n  .navbar-expand-sm .navbar-collapse {\n    display: -webkit-box !important;\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-sm .navbar-toggler {\n    display: none;\n  }\n}\n@media (max-width: 767.98px) {\n  .navbar-expand-md > .container,\n.navbar-expand-md > .container-fluid {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-expand-md {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-flow: row nowrap;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .navbar-expand-md .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-direction: row;\n  }\n  .navbar-expand-md .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-md .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-md > .container,\n.navbar-expand-md > .container-fluid {\n    flex-wrap: nowrap;\n  }\n  .navbar-expand-md .navbar-collapse {\n    display: -webkit-box !important;\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-md .navbar-toggler {\n    display: none;\n  }\n}\n@media (max-width: 991.98px) {\n  .navbar-expand-lg > .container,\n.navbar-expand-lg > .container-fluid {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 992px) {\n  .navbar-expand-lg {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-flow: row nowrap;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .navbar-expand-lg .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-direction: row;\n  }\n  .navbar-expand-lg .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-lg .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-lg > .container,\n.navbar-expand-lg > .container-fluid {\n    flex-wrap: nowrap;\n  }\n  .navbar-expand-lg .navbar-collapse {\n    display: -webkit-box !important;\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-lg .navbar-toggler {\n    display: none;\n  }\n}\n@media (max-width: 1199.98px) {\n  .navbar-expand-xl > .container,\n.navbar-expand-xl > .container-fluid {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n@media (min-width: 1200px) {\n  .navbar-expand-xl {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-flow: row nowrap;\n    -webkit-box-pack: start;\n            justify-content: flex-start;\n  }\n  .navbar-expand-xl .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-direction: row;\n  }\n  .navbar-expand-xl .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-xl .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-xl > .container,\n.navbar-expand-xl > .container-fluid {\n    flex-wrap: nowrap;\n  }\n  .navbar-expand-xl .navbar-collapse {\n    display: -webkit-box !important;\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-xl .navbar-toggler {\n    display: none;\n  }\n}\n.navbar-expand {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-flow: row nowrap;\n  -webkit-box-pack: start;\n          justify-content: flex-start;\n}\n.navbar-expand > .container,\n.navbar-expand > .container-fluid {\n  padding-right: 0;\n  padding-left: 0;\n}\n.navbar-expand .navbar-nav {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\n.navbar-expand .navbar-nav .dropdown-menu {\n  position: absolute;\n}\n.navbar-expand .navbar-nav .nav-link {\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n}\n.navbar-expand > .container,\n.navbar-expand > .container-fluid {\n  flex-wrap: nowrap;\n}\n.navbar-expand .navbar-collapse {\n  display: -webkit-box !important;\n  display: flex !important;\n  flex-basis: auto;\n}\n.navbar-expand .navbar-toggler {\n  display: none;\n}\n\n.navbar-light .navbar-brand {\n  color: rgba(0, 0, 0, 0.9);\n}\n.navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus {\n  color: rgba(0, 0, 0, 0.9);\n}\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5);\n}\n.navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus {\n  color: rgba(0, 0, 0, 0.7);\n}\n.navbar-light .navbar-nav .nav-link.disabled {\n  color: rgba(0, 0, 0, 0.3);\n}\n.navbar-light .navbar-nav .show > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.show,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9);\n}\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.5);\n  border-color: rgba(0, 0, 0, 0.1);\n}\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\");\n}\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5);\n}\n.navbar-light .navbar-text a {\n  color: rgba(0, 0, 0, 0.9);\n}\n.navbar-light .navbar-text a:hover, .navbar-light .navbar-text a:focus {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-dark .navbar-brand {\n  color: #fff;\n}\n.navbar-dark .navbar-brand:hover, .navbar-dark .navbar-brand:focus {\n  color: #fff;\n}\n.navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.8);\n}\n.navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {\n  color: #fff;\n}\n.navbar-dark .navbar-nav .nav-link.disabled {\n  color: rgba(255, 255, 255, 0.25);\n}\n.navbar-dark .navbar-nav .show > .nav-link,\n.navbar-dark .navbar-nav .active > .nav-link,\n.navbar-dark .navbar-nav .nav-link.show,\n.navbar-dark .navbar-nav .nav-link.active {\n  color: #fff;\n}\n.navbar-dark .navbar-toggler {\n  color: rgba(255, 255, 255, 0.8);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.navbar-dark .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\");\n}\n.navbar-dark .navbar-text {\n  color: rgba(255, 255, 255, 0.8);\n}\n.navbar-dark .navbar-text a {\n  color: #fff;\n}\n.navbar-dark .navbar-text a:hover, .navbar-dark .navbar-text a:focus {\n  color: #fff;\n}\n\n.card {\n  position: relative;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem;\n}\n.card > hr {\n  margin-right: 0;\n  margin-left: 0;\n}\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.card-body {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  padding: 1.25rem;\n}\n\n.card-title {\n  margin-bottom: 0.75rem;\n}\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0;\n}\n\n.card-text:last-child {\n  margin-bottom: 0;\n}\n\n.card-link:hover {\n  text-decoration: none;\n}\n.card-link + .card-link {\n  margin-left: 1.25rem;\n}\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n.card-header:first-child {\n  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;\n}\n.card-header + .list-group .list-group-item:first-child {\n  border-top: 0;\n}\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-top: 1px solid rgba(0, 0, 0, 0.125);\n}\n.card-footer:last-child {\n  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);\n}\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0;\n}\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem;\n}\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem;\n}\n\n.card-img {\n  width: 100%;\n  border-radius: calc(0.25rem - 1px);\n}\n\n.card-img-top {\n  width: 100%;\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n\n.card-img-bottom {\n  width: 100%;\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px);\n}\n\n.card-deck {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n.card-deck .card {\n  margin-bottom: 15px;\n}\n@media (min-width: 576px) {\n  .card-deck {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-flow: row wrap;\n    margin-right: -15px;\n    margin-left: -15px;\n  }\n  .card-deck .card {\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-flex: 1;\n            flex: 1 0 0%;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n            flex-direction: column;\n    margin-right: 15px;\n    margin-bottom: 0;\n    margin-left: 15px;\n  }\n}\n\n.card-group {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n.card-group > .card {\n  margin-bottom: 15px;\n}\n@media (min-width: 576px) {\n  .card-group {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-flow: row wrap;\n  }\n  .card-group > .card {\n    -webkit-box-flex: 1;\n            flex: 1 0 0%;\n    margin-bottom: 0;\n  }\n  .card-group > .card + .card {\n    margin-left: 0;\n    border-left: 0;\n  }\n  .card-group > .card:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n  .card-group > .card:not(:last-child) .card-img-top,\n.card-group > .card:not(:last-child) .card-header {\n    border-top-right-radius: 0;\n  }\n  .card-group > .card:not(:last-child) .card-img-bottom,\n.card-group > .card:not(:last-child) .card-footer {\n    border-bottom-right-radius: 0;\n  }\n  .card-group > .card:not(:first-child) {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n  .card-group > .card:not(:first-child) .card-img-top,\n.card-group > .card:not(:first-child) .card-header {\n    border-top-left-radius: 0;\n  }\n  .card-group > .card:not(:first-child) .card-img-bottom,\n.card-group > .card:not(:first-child) .card-footer {\n    border-bottom-left-radius: 0;\n  }\n}\n\n.card-columns .card {\n  margin-bottom: 0.75rem;\n}\n@media (min-width: 576px) {\n  .card-columns {\n    -webkit-column-count: 3;\n       -moz-column-count: 3;\n            column-count: 3;\n    -webkit-column-gap: 1.25rem;\n       -moz-column-gap: 1.25rem;\n            column-gap: 1.25rem;\n    orphans: 1;\n    widows: 1;\n  }\n  .card-columns .card {\n    display: inline-block;\n    width: 100%;\n  }\n}\n\n.accordion > .card {\n  overflow: hidden;\n}\n.accordion > .card:not(:first-of-type) .card-header:first-child {\n  border-radius: 0;\n}\n.accordion > .card:not(:first-of-type):not(:last-of-type) {\n  border-bottom: 0;\n  border-radius: 0;\n}\n.accordion > .card:first-of-type {\n  border-bottom: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.accordion > .card:last-of-type {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.accordion > .card .card-header {\n  margin-bottom: -1px;\n}\n\n.breadcrumb {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #e9ecef;\n  border-radius: 0.25rem;\n}\n\n.breadcrumb-item + .breadcrumb-item {\n  padding-left: 0.5rem;\n}\n.breadcrumb-item + .breadcrumb-item::before {\n  display: inline-block;\n  padding-right: 0.5rem;\n  color: #868e96;\n  content: \"/\";\n}\n.breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: underline;\n}\n.breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: none;\n}\n.breadcrumb-item.active {\n  color: #868e96;\n}\n\n.pagination {\n  display: -webkit-box;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem;\n}\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #2FA4E7;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n}\n.page-link:hover {\n  z-index: 2;\n  color: #157ab5;\n  text-decoration: none;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n.page-link:focus {\n  z-index: 2;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.25);\n}\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n.page-item:last-child .page-link {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem;\n}\n.page-item.active .page-link {\n  z-index: 1;\n  color: #fff;\n  background-color: #2FA4E7;\n  border-color: #2FA4E7;\n}\n.page-item.disabled .page-link {\n  color: #868e96;\n  pointer-events: none;\n  cursor: auto;\n  background-color: #fff;\n  border-color: #dee2e6;\n}\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n}\n.pagination-lg .page-item:first-child .page-link {\n  border-top-left-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem;\n}\n.pagination-lg .page-item:last-child .page-link {\n  border-top-right-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem;\n}\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.pagination-sm .page-item:first-child .page-link {\n  border-top-left-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem;\n}\n.pagination-sm .page-item:last-child .page-link {\n  border-top-right-radius: 0.2rem;\n  border-bottom-right-radius: 0.2rem;\n}\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: 700;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem;\n  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .badge {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\na.badge:hover, a.badge:focus {\n  text-decoration: none;\n}\n\n.badge:empty {\n  display: none;\n}\n\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem;\n}\n\n.badge-primary {\n  color: #fff;\n  background-color: #2FA4E7;\n}\na.badge-primary:hover, a.badge-primary:focus {\n  color: #fff;\n  background-color: #178acc;\n}\na.badge-primary:focus, a.badge-primary.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.5);\n}\n\n.badge-secondary {\n  color: #212529;\n  background-color: #e9ecef;\n}\na.badge-secondary:hover, a.badge-secondary:focus {\n  color: #212529;\n  background-color: #cbd3da;\n}\na.badge-secondary:focus, a.badge-secondary.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(233, 236, 239, 0.5);\n}\n\n.badge-success {\n  color: #fff;\n  background-color: #73A839;\n}\na.badge-success:hover, a.badge-success:focus {\n  color: #fff;\n  background-color: #59822c;\n}\na.badge-success:focus, a.badge-success.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(115, 168, 57, 0.5);\n}\n\n.badge-info {\n  color: #fff;\n  background-color: #033C73;\n}\na.badge-info:hover, a.badge-info:focus {\n  color: #fff;\n  background-color: #022241;\n}\na.badge-info:focus, a.badge-info.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(3, 60, 115, 0.5);\n}\n\n.badge-warning {\n  color: #fff;\n  background-color: #DD5600;\n}\na.badge-warning:hover, a.badge-warning:focus {\n  color: #fff;\n  background-color: #aa4200;\n}\na.badge-warning:focus, a.badge-warning.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(221, 86, 0, 0.5);\n}\n\n.badge-danger {\n  color: #fff;\n  background-color: #C71C22;\n}\na.badge-danger:hover, a.badge-danger:focus {\n  color: #fff;\n  background-color: #9a161a;\n}\na.badge-danger:focus, a.badge-danger.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(199, 28, 34, 0.5);\n}\n\n.badge-light {\n  color: #212529;\n  background-color: #f8f9fa;\n}\na.badge-light:hover, a.badge-light:focus {\n  color: #212529;\n  background-color: #dae0e5;\n}\na.badge-light:focus, a.badge-light.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n\n.badge-dark {\n  color: #fff;\n  background-color: #343a40;\n}\na.badge-dark:hover, a.badge-dark:focus {\n  color: #fff;\n  background-color: #1d2124;\n}\na.badge-dark:focus, a.badge-dark.focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #e9ecef;\n  border-radius: 0.3rem;\n}\n@media (min-width: 576px) {\n  .jumbotron {\n    padding: 4rem 2rem;\n  }\n}\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0;\n}\n\n.alert {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n\n.alert-heading {\n  color: inherit;\n}\n\n.alert-link {\n  font-weight: 700;\n}\n\n.alert-dismissible {\n  padding-right: 4rem;\n}\n.alert-dismissible .close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0.75rem 1.25rem;\n  color: inherit;\n}\n\n.alert-primary {\n  color: #185578;\n  background-color: #d5edfa;\n  border-color: #c5e6f8;\n}\n.alert-primary hr {\n  border-top-color: #aedcf5;\n}\n.alert-primary .alert-link {\n  color: #10374e;\n}\n\n.alert-secondary {\n  color: #797b7c;\n  background-color: #fbfbfc;\n  border-color: #f9fafb;\n}\n.alert-secondary hr {\n  border-top-color: #eaedf1;\n}\n.alert-secondary .alert-link {\n  color: #606162;\n}\n\n.alert-success {\n  color: #3c571e;\n  background-color: #e3eed7;\n  border-color: #d8e7c8;\n}\n.alert-success hr {\n  border-top-color: #cbdfb6;\n}\n.alert-success .alert-link {\n  color: #223111;\n}\n\n.alert-info {\n  color: #021f3c;\n  background-color: #cdd8e3;\n  border-color: #b8c8d8;\n}\n.alert-info hr {\n  border-top-color: #a8bbcf;\n}\n.alert-info .alert-link {\n  color: #00060b;\n}\n\n.alert-warning {\n  color: #732d00;\n  background-color: #f8ddcc;\n  border-color: #f5d0b8;\n}\n.alert-warning hr {\n  border-top-color: #f2c1a2;\n}\n.alert-warning .alert-link {\n  color: #401900;\n}\n\n.alert-danger {\n  color: #670f12;\n  background-color: #f4d2d3;\n  border-color: #efbfc1;\n}\n.alert-danger hr {\n  border-top-color: #eaabad;\n}\n.alert-danger .alert-link {\n  color: #3a090a;\n}\n\n.alert-light {\n  color: #818182;\n  background-color: #fefefe;\n  border-color: #fdfdfe;\n}\n.alert-light hr {\n  border-top-color: #ececf6;\n}\n.alert-light .alert-link {\n  color: #686868;\n}\n\n.alert-dark {\n  color: #1b1e21;\n  background-color: #d6d8d9;\n  border-color: #c6c8ca;\n}\n.alert-dark hr {\n  border-top-color: #b9bbbe;\n}\n.alert-dark .alert-link {\n  color: #040505;\n}\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  display: -webkit-box;\n  display: flex;\n  height: 1rem;\n  overflow: hidden;\n  font-size: 0.75rem;\n  background-color: #e9ecef;\n  border-radius: 0.25rem;\n}\n\n.progress-bar {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: center;\n          justify-content: center;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #2FA4E7;\n  -webkit-transition: width 0.6s ease;\n  transition: width 0.6s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .progress-bar {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem;\n}\n\n.progress-bar-animated {\n  -webkit-animation: progress-bar-stripes 1s linear infinite;\n          animation: progress-bar-stripes 1s linear infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .progress-bar-animated {\n    -webkit-animation: none;\n            animation: none;\n  }\n}\n\n.media {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: start;\n          align-items: flex-start;\n}\n\n.media-body {\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n\n.list-group {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n}\n\n.list-group-item-action {\n  width: 100%;\n  color: #495057;\n  text-align: inherit;\n}\n.list-group-item-action:hover, .list-group-item-action:focus {\n  z-index: 1;\n  color: #495057;\n  text-decoration: none;\n  background-color: #f8f9fa;\n}\n.list-group-item-action:active {\n  color: #495057;\n  background-color: #e9ecef;\n}\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n}\n.list-group-item:first-child {\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n.list-group-item.disabled, .list-group-item:disabled {\n  color: #868e96;\n  pointer-events: none;\n  background-color: #fff;\n}\n.list-group-item.active {\n  z-index: 2;\n  color: #fff;\n  background-color: #2FA4E7;\n  border-color: #2FA4E7;\n}\n\n.list-group-horizontal {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\n.list-group-horizontal .list-group-item {\n  margin-right: -1px;\n  margin-bottom: 0;\n}\n.list-group-horizontal .list-group-item:first-child {\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n  border-top-right-radius: 0;\n}\n.list-group-horizontal .list-group-item:last-child {\n  margin-right: 0;\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0;\n}\n\n@media (min-width: 576px) {\n  .list-group-horizontal-sm {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-direction: row;\n  }\n  .list-group-horizontal-sm .list-group-item {\n    margin-right: -1px;\n    margin-bottom: 0;\n  }\n  .list-group-horizontal-sm .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-sm .list-group-item:last-child {\n    margin-right: 0;\n    border-top-right-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n}\n@media (min-width: 768px) {\n  .list-group-horizontal-md {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-direction: row;\n  }\n  .list-group-horizontal-md .list-group-item {\n    margin-right: -1px;\n    margin-bottom: 0;\n  }\n  .list-group-horizontal-md .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-md .list-group-item:last-child {\n    margin-right: 0;\n    border-top-right-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n}\n@media (min-width: 992px) {\n  .list-group-horizontal-lg {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-direction: row;\n  }\n  .list-group-horizontal-lg .list-group-item {\n    margin-right: -1px;\n    margin-bottom: 0;\n  }\n  .list-group-horizontal-lg .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-lg .list-group-item:last-child {\n    margin-right: 0;\n    border-top-right-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n}\n@media (min-width: 1200px) {\n  .list-group-horizontal-xl {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n            flex-direction: row;\n  }\n  .list-group-horizontal-xl .list-group-item {\n    margin-right: -1px;\n    margin-bottom: 0;\n  }\n  .list-group-horizontal-xl .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-xl .list-group-item:last-child {\n    margin-right: 0;\n    border-top-right-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n}\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0;\n}\n.list-group-flush .list-group-item:last-child {\n  margin-bottom: -1px;\n}\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0;\n}\n.list-group-flush:last-child .list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom: 0;\n}\n\n.list-group-item-primary {\n  color: #185578;\n  background-color: #c5e6f8;\n}\n.list-group-item-primary.list-group-item-action:hover, .list-group-item-primary.list-group-item-action:focus {\n  color: #185578;\n  background-color: #aedcf5;\n}\n.list-group-item-primary.list-group-item-action.active {\n  color: #fff;\n  background-color: #185578;\n  border-color: #185578;\n}\n\n.list-group-item-secondary {\n  color: #797b7c;\n  background-color: #f9fafb;\n}\n.list-group-item-secondary.list-group-item-action:hover, .list-group-item-secondary.list-group-item-action:focus {\n  color: #797b7c;\n  background-color: #eaedf1;\n}\n.list-group-item-secondary.list-group-item-action.active {\n  color: #fff;\n  background-color: #797b7c;\n  border-color: #797b7c;\n}\n\n.list-group-item-success {\n  color: #3c571e;\n  background-color: #d8e7c8;\n}\n.list-group-item-success.list-group-item-action:hover, .list-group-item-success.list-group-item-action:focus {\n  color: #3c571e;\n  background-color: #cbdfb6;\n}\n.list-group-item-success.list-group-item-action.active {\n  color: #fff;\n  background-color: #3c571e;\n  border-color: #3c571e;\n}\n\n.list-group-item-info {\n  color: #021f3c;\n  background-color: #b8c8d8;\n}\n.list-group-item-info.list-group-item-action:hover, .list-group-item-info.list-group-item-action:focus {\n  color: #021f3c;\n  background-color: #a8bbcf;\n}\n.list-group-item-info.list-group-item-action.active {\n  color: #fff;\n  background-color: #021f3c;\n  border-color: #021f3c;\n}\n\n.list-group-item-warning {\n  color: #732d00;\n  background-color: #f5d0b8;\n}\n.list-group-item-warning.list-group-item-action:hover, .list-group-item-warning.list-group-item-action:focus {\n  color: #732d00;\n  background-color: #f2c1a2;\n}\n.list-group-item-warning.list-group-item-action.active {\n  color: #fff;\n  background-color: #732d00;\n  border-color: #732d00;\n}\n\n.list-group-item-danger {\n  color: #670f12;\n  background-color: #efbfc1;\n}\n.list-group-item-danger.list-group-item-action:hover, .list-group-item-danger.list-group-item-action:focus {\n  color: #670f12;\n  background-color: #eaabad;\n}\n.list-group-item-danger.list-group-item-action.active {\n  color: #fff;\n  background-color: #670f12;\n  border-color: #670f12;\n}\n\n.list-group-item-light {\n  color: #818182;\n  background-color: #fdfdfe;\n}\n.list-group-item-light.list-group-item-action:hover, .list-group-item-light.list-group-item-action:focus {\n  color: #818182;\n  background-color: #ececf6;\n}\n.list-group-item-light.list-group-item-action.active {\n  color: #fff;\n  background-color: #818182;\n  border-color: #818182;\n}\n\n.list-group-item-dark {\n  color: #1b1e21;\n  background-color: #c6c8ca;\n}\n.list-group-item-dark.list-group-item-action:hover, .list-group-item-dark.list-group-item-action:focus {\n  color: #1b1e21;\n  background-color: #b9bbbe;\n}\n.list-group-item-dark.list-group-item-action.active {\n  color: #fff;\n  background-color: #1b1e21;\n  border-color: #1b1e21;\n}\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: 0.5;\n}\n.close:hover {\n  color: #000;\n  text-decoration: none;\n}\n.close:not(:disabled):not(.disabled):hover, .close:not(:disabled):not(.disabled):focus {\n  opacity: 0.75;\n}\n\nbutton.close {\n  padding: 0;\n  background-color: transparent;\n  border: 0;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n\na.close.disabled {\n  pointer-events: none;\n}\n\n.toast {\n  max-width: 350px;\n  overflow: hidden;\n  font-size: 0.875rem;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  opacity: 0;\n  border-radius: 0.25rem;\n}\n.toast:not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n.toast.showing {\n  opacity: 1;\n}\n.toast.show {\n  display: block;\n  opacity: 1;\n}\n.toast.hide {\n  display: none;\n}\n\n.toast-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  padding: 0.25rem 0.75rem;\n  color: #868e96;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.toast-body {\n  padding: 0.75rem;\n}\n\n.modal-open {\n  overflow: hidden;\n}\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  outline: 0;\n}\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none;\n}\n.modal.fade .modal-dialog {\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  transition: -webkit-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n  -webkit-transform: translate(0, -50px);\n          transform: translate(0, -50px);\n}\n@media (prefers-reduced-motion: reduce) {\n  .modal.fade .modal-dialog {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.modal.show .modal-dialog {\n  -webkit-transform: none;\n          transform: none;\n}\n\n.modal-dialog-scrollable {\n  display: -webkit-box;\n  display: flex;\n  max-height: calc(100% - 1rem);\n}\n.modal-dialog-scrollable .modal-content {\n  max-height: calc(100vh - 1rem);\n  overflow: hidden;\n}\n.modal-dialog-scrollable .modal-header,\n.modal-dialog-scrollable .modal-footer {\n  flex-shrink: 0;\n}\n.modal-dialog-scrollable .modal-body {\n  overflow-y: auto;\n}\n\n.modal-dialog-centered {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  min-height: calc(100% - 1rem);\n}\n.modal-dialog-centered::before {\n  display: block;\n  height: calc(100vh - 1rem);\n  content: \"\";\n}\n.modal-dialog-centered.modal-dialog-scrollable {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-pack: center;\n          justify-content: center;\n  height: 100%;\n}\n.modal-dialog-centered.modal-dialog-scrollable .modal-content {\n  max-height: none;\n}\n.modal-dialog-centered.modal-dialog-scrollable::before {\n  content: none;\n}\n\n.modal-content {\n  position: relative;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0;\n}\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1040;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000;\n}\n.modal-backdrop.fade {\n  opacity: 0;\n}\n.modal-backdrop.show {\n  opacity: 0.5;\n}\n\n.modal-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  padding: 1rem 1rem;\n  border-bottom: 1px solid #dee2e6;\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem;\n}\n.modal-header .close {\n  padding: 1rem 1rem;\n  margin: -1rem -1rem -1rem auto;\n}\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5;\n}\n\n.modal-body {\n  position: relative;\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  padding: 1rem;\n}\n\n.modal-footer {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n  padding: 1rem;\n  border-top: 1px solid #dee2e6;\n  border-bottom-right-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem;\n}\n.modal-footer > :not(:first-child) {\n  margin-left: 0.25rem;\n}\n.modal-footer > :not(:last-child) {\n  margin-right: 0.25rem;\n}\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 1.75rem auto;\n  }\n\n  .modal-dialog-scrollable {\n    max-height: calc(100% - 3.5rem);\n  }\n  .modal-dialog-scrollable .modal-content {\n    max-height: calc(100vh - 3.5rem);\n  }\n\n  .modal-dialog-centered {\n    min-height: calc(100% - 3.5rem);\n  }\n  .modal-dialog-centered::before {\n    height: calc(100vh - 3.5rem);\n  }\n\n  .modal-sm {\n    max-width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  .modal-lg,\n.modal-xl {\n    max-width: 800px;\n  }\n}\n@media (min-width: 1200px) {\n  .modal-xl {\n    max-width: 1140px;\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0;\n}\n.tooltip.show {\n  opacity: 0.9;\n}\n.tooltip .arrow {\n  position: absolute;\n  display: block;\n  width: 0.8rem;\n  height: 0.4rem;\n}\n.tooltip .arrow::before {\n  position: absolute;\n  content: \"\";\n  border-color: transparent;\n  border-style: solid;\n}\n\n.bs-tooltip-top, .bs-tooltip-auto[x-placement^=top] {\n  padding: 0.4rem 0;\n}\n.bs-tooltip-top .arrow, .bs-tooltip-auto[x-placement^=top] .arrow {\n  bottom: 0;\n}\n.bs-tooltip-top .arrow::before, .bs-tooltip-auto[x-placement^=top] .arrow::before {\n  top: 0;\n  border-width: 0.4rem 0.4rem 0;\n  border-top-color: #000;\n}\n\n.bs-tooltip-right, .bs-tooltip-auto[x-placement^=right] {\n  padding: 0 0.4rem;\n}\n.bs-tooltip-right .arrow, .bs-tooltip-auto[x-placement^=right] .arrow {\n  left: 0;\n  width: 0.4rem;\n  height: 0.8rem;\n}\n.bs-tooltip-right .arrow::before, .bs-tooltip-auto[x-placement^=right] .arrow::before {\n  right: 0;\n  border-width: 0.4rem 0.4rem 0.4rem 0;\n  border-right-color: #000;\n}\n\n.bs-tooltip-bottom, .bs-tooltip-auto[x-placement^=bottom] {\n  padding: 0.4rem 0;\n}\n.bs-tooltip-bottom .arrow, .bs-tooltip-auto[x-placement^=bottom] .arrow {\n  top: 0;\n}\n.bs-tooltip-bottom .arrow::before, .bs-tooltip-auto[x-placement^=bottom] .arrow::before {\n  bottom: 0;\n  border-width: 0 0.4rem 0.4rem;\n  border-bottom-color: #000;\n}\n\n.bs-tooltip-left, .bs-tooltip-auto[x-placement^=left] {\n  padding: 0 0.4rem;\n}\n.bs-tooltip-left .arrow, .bs-tooltip-auto[x-placement^=left] .arrow {\n  right: 0;\n  width: 0.4rem;\n  height: 0.8rem;\n}\n.bs-tooltip-left .arrow::before, .bs-tooltip-auto[x-placement^=left] .arrow::before {\n  left: 0;\n  border-width: 0.4rem 0 0.4rem 0.4rem;\n  border-left-color: #000;\n}\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 0.25rem 0.5rem;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem;\n}\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n}\n.popover .arrow {\n  position: absolute;\n  display: block;\n  width: 1rem;\n  height: 0.5rem;\n  margin: 0 0.3rem;\n}\n.popover .arrow::before, .popover .arrow::after {\n  position: absolute;\n  display: block;\n  content: \"\";\n  border-color: transparent;\n  border-style: solid;\n}\n\n.bs-popover-top, .bs-popover-auto[x-placement^=top] {\n  margin-bottom: 0.5rem;\n}\n.bs-popover-top > .arrow, .bs-popover-auto[x-placement^=top] > .arrow {\n  bottom: calc((0.5rem + 1px) * -1);\n}\n.bs-popover-top > .arrow::before, .bs-popover-auto[x-placement^=top] > .arrow::before {\n  bottom: 0;\n  border-width: 0.5rem 0.5rem 0;\n  border-top-color: rgba(0, 0, 0, 0.25);\n}\n.bs-popover-top > .arrow::after, .bs-popover-auto[x-placement^=top] > .arrow::after {\n  bottom: 1px;\n  border-width: 0.5rem 0.5rem 0;\n  border-top-color: #fff;\n}\n\n.bs-popover-right, .bs-popover-auto[x-placement^=right] {\n  margin-left: 0.5rem;\n}\n.bs-popover-right > .arrow, .bs-popover-auto[x-placement^=right] > .arrow {\n  left: calc((0.5rem + 1px) * -1);\n  width: 0.5rem;\n  height: 1rem;\n  margin: 0.3rem 0;\n}\n.bs-popover-right > .arrow::before, .bs-popover-auto[x-placement^=right] > .arrow::before {\n  left: 0;\n  border-width: 0.5rem 0.5rem 0.5rem 0;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n.bs-popover-right > .arrow::after, .bs-popover-auto[x-placement^=right] > .arrow::after {\n  left: 1px;\n  border-width: 0.5rem 0.5rem 0.5rem 0;\n  border-right-color: #fff;\n}\n\n.bs-popover-bottom, .bs-popover-auto[x-placement^=bottom] {\n  margin-top: 0.5rem;\n}\n.bs-popover-bottom > .arrow, .bs-popover-auto[x-placement^=bottom] > .arrow {\n  top: calc((0.5rem + 1px) * -1);\n}\n.bs-popover-bottom > .arrow::before, .bs-popover-auto[x-placement^=bottom] > .arrow::before {\n  top: 0;\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n}\n.bs-popover-bottom > .arrow::after, .bs-popover-auto[x-placement^=bottom] > .arrow::after {\n  top: 1px;\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-bottom-color: #fff;\n}\n.bs-popover-bottom .popover-header::before, .bs-popover-auto[x-placement^=bottom] .popover-header::before {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  display: block;\n  width: 1rem;\n  margin-left: -0.5rem;\n  content: \"\";\n  border-bottom: 1px solid #f7f7f7;\n}\n\n.bs-popover-left, .bs-popover-auto[x-placement^=left] {\n  margin-right: 0.5rem;\n}\n.bs-popover-left > .arrow, .bs-popover-auto[x-placement^=left] > .arrow {\n  right: calc((0.5rem + 1px) * -1);\n  width: 0.5rem;\n  height: 1rem;\n  margin: 0.3rem 0;\n}\n.bs-popover-left > .arrow::before, .bs-popover-auto[x-placement^=left] > .arrow::before {\n  right: 0;\n  border-width: 0.5rem 0 0.5rem 0.5rem;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n.bs-popover-left > .arrow::after, .bs-popover-auto[x-placement^=left] > .arrow::after {\n  right: 1px;\n  border-width: 0.5rem 0 0.5rem 0.5rem;\n  border-left-color: #fff;\n}\n\n.popover-header {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  color: #2FA4E7;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px);\n}\n.popover-header:empty {\n  display: none;\n}\n\n.popover-body {\n  padding: 0.5rem 0.75rem;\n  color: #495057;\n}\n\n.carousel {\n  position: relative;\n}\n\n.carousel.pointer-event {\n  touch-action: pan-y;\n}\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.carousel-inner::after {\n  display: block;\n  clear: both;\n  content: \"\";\n}\n\n.carousel-item {\n  position: relative;\n  display: none;\n  float: left;\n  width: 100%;\n  margin-right: -100%;\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  -webkit-transition: -webkit-transform 0.6s ease-in-out;\n  transition: -webkit-transform 0.6s ease-in-out;\n  transition: transform 0.6s ease-in-out;\n  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .carousel-item {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: block;\n}\n\n.carousel-item-next:not(.carousel-item-left),\n.active.carousel-item-right {\n  -webkit-transform: translateX(100%);\n          transform: translateX(100%);\n}\n\n.carousel-item-prev:not(.carousel-item-right),\n.active.carousel-item-left {\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n}\n\n.carousel-fade .carousel-item {\n  opacity: 0;\n  -webkit-transition-property: opacity;\n  transition-property: opacity;\n  -webkit-transform: none;\n          transform: none;\n}\n.carousel-fade .carousel-item.active,\n.carousel-fade .carousel-item-next.carousel-item-left,\n.carousel-fade .carousel-item-prev.carousel-item-right {\n  z-index: 1;\n  opacity: 1;\n}\n.carousel-fade .active.carousel-item-left,\n.carousel-fade .active.carousel-item-right {\n  z-index: 0;\n  opacity: 0;\n  -webkit-transition: 0s 0.6s opacity;\n  transition: 0s 0.6s opacity;\n}\n@media (prefers-reduced-motion: reduce) {\n  .carousel-fade .active.carousel-item-left,\n.carousel-fade .active.carousel-item-right {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5;\n  -webkit-transition: opacity 0.15s ease;\n  transition: opacity 0.15s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .carousel-control-prev,\n.carousel-control-next {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.carousel-control-prev:hover, .carousel-control-prev:focus,\n.carousel-control-next:hover,\n.carousel-control-next:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  opacity: 0.9;\n}\n\n.carousel-control-prev {\n  left: 0;\n}\n\n.carousel-control-next {\n  right: 0;\n}\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: no-repeat 50%/100% 100%;\n}\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e\");\n}\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3e%3c/svg%3e\");\n}\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 15;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none;\n}\n.carousel-indicators li {\n  box-sizing: content-box;\n  -webkit-box-flex: 0;\n          flex: 0 1 auto;\n  width: 30px;\n  height: 3px;\n  margin-right: 3px;\n  margin-left: 3px;\n  text-indent: -999px;\n  cursor: pointer;\n  background-color: #fff;\n  background-clip: padding-box;\n  border-top: 10px solid transparent;\n  border-bottom: 10px solid transparent;\n  opacity: 0.5;\n  -webkit-transition: opacity 0.6s ease;\n  transition: opacity 0.6s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .carousel-indicators li {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.carousel-indicators .active {\n  opacity: 1;\n}\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n}\n\n@-webkit-keyframes spinner-border {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes spinner-border {\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.spinner-border {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: text-bottom;\n  border: 0.25em solid currentColor;\n  border-right-color: transparent;\n  border-radius: 50%;\n  -webkit-animation: spinner-border 0.75s linear infinite;\n          animation: spinner-border 0.75s linear infinite;\n}\n\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n  border-width: 0.2em;\n}\n\n@-webkit-keyframes spinner-grow {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n\n@keyframes spinner-grow {\n  0% {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n.spinner-grow {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: text-bottom;\n  background-color: currentColor;\n  border-radius: 50%;\n  opacity: 0;\n  -webkit-animation: spinner-grow 0.75s linear infinite;\n          animation: spinner-grow 0.75s linear infinite;\n}\n\n.spinner-grow-sm {\n  width: 1rem;\n  height: 1rem;\n}\n\n.align-baseline {\n  vertical-align: baseline !important;\n}\n\n.align-top {\n  vertical-align: top !important;\n}\n\n.align-middle {\n  vertical-align: middle !important;\n}\n\n.align-bottom {\n  vertical-align: bottom !important;\n}\n\n.align-text-bottom {\n  vertical-align: text-bottom !important;\n}\n\n.align-text-top {\n  vertical-align: text-top !important;\n}\n\n.bg-primary {\n  background-color: #2FA4E7 !important;\n}\n\na.bg-primary:hover, a.bg-primary:focus,\nbutton.bg-primary:hover,\nbutton.bg-primary:focus {\n  background-color: #178acc !important;\n}\n\n.bg-secondary {\n  background-color: #e9ecef !important;\n}\n\na.bg-secondary:hover, a.bg-secondary:focus,\nbutton.bg-secondary:hover,\nbutton.bg-secondary:focus {\n  background-color: #cbd3da !important;\n}\n\n.bg-success {\n  background-color: #73A839 !important;\n}\n\na.bg-success:hover, a.bg-success:focus,\nbutton.bg-success:hover,\nbutton.bg-success:focus {\n  background-color: #59822c !important;\n}\n\n.bg-info {\n  background-color: #033C73 !important;\n}\n\na.bg-info:hover, a.bg-info:focus,\nbutton.bg-info:hover,\nbutton.bg-info:focus {\n  background-color: #022241 !important;\n}\n\n.bg-warning {\n  background-color: #DD5600 !important;\n}\n\na.bg-warning:hover, a.bg-warning:focus,\nbutton.bg-warning:hover,\nbutton.bg-warning:focus {\n  background-color: #aa4200 !important;\n}\n\n.bg-danger {\n  background-color: #C71C22 !important;\n}\n\na.bg-danger:hover, a.bg-danger:focus,\nbutton.bg-danger:hover,\nbutton.bg-danger:focus {\n  background-color: #9a161a !important;\n}\n\n.bg-light {\n  background-color: #f8f9fa !important;\n}\n\na.bg-light:hover, a.bg-light:focus,\nbutton.bg-light:hover,\nbutton.bg-light:focus {\n  background-color: #dae0e5 !important;\n}\n\n.bg-dark {\n  background-color: #343a40 !important;\n}\n\na.bg-dark:hover, a.bg-dark:focus,\nbutton.bg-dark:hover,\nbutton.bg-dark:focus {\n  background-color: #1d2124 !important;\n}\n\n.bg-white {\n  background-color: #fff !important;\n}\n\n.bg-transparent {\n  background-color: transparent !important;\n}\n\n.border {\n  border: 1px solid #dee2e6 !important;\n}\n\n.border-top {\n  border-top: 1px solid #dee2e6 !important;\n}\n\n.border-right {\n  border-right: 1px solid #dee2e6 !important;\n}\n\n.border-bottom {\n  border-bottom: 1px solid #dee2e6 !important;\n}\n\n.border-left {\n  border-left: 1px solid #dee2e6 !important;\n}\n\n.border-0 {\n  border: 0 !important;\n}\n\n.border-top-0 {\n  border-top: 0 !important;\n}\n\n.border-right-0 {\n  border-right: 0 !important;\n}\n\n.border-bottom-0 {\n  border-bottom: 0 !important;\n}\n\n.border-left-0 {\n  border-left: 0 !important;\n}\n\n.border-primary {\n  border-color: #2FA4E7 !important;\n}\n\n.border-secondary {\n  border-color: #e9ecef !important;\n}\n\n.border-success {\n  border-color: #73A839 !important;\n}\n\n.border-info {\n  border-color: #033C73 !important;\n}\n\n.border-warning {\n  border-color: #DD5600 !important;\n}\n\n.border-danger {\n  border-color: #C71C22 !important;\n}\n\n.border-light {\n  border-color: #f8f9fa !important;\n}\n\n.border-dark {\n  border-color: #343a40 !important;\n}\n\n.border-white {\n  border-color: #fff !important;\n}\n\n.rounded-sm {\n  border-radius: 0.2rem !important;\n}\n\n.rounded {\n  border-radius: 0.25rem !important;\n}\n\n.rounded-top {\n  border-top-left-radius: 0.25rem !important;\n  border-top-right-radius: 0.25rem !important;\n}\n\n.rounded-right {\n  border-top-right-radius: 0.25rem !important;\n  border-bottom-right-radius: 0.25rem !important;\n}\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important;\n}\n\n.rounded-left {\n  border-top-left-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important;\n}\n\n.rounded-lg {\n  border-radius: 0.3rem !important;\n}\n\n.rounded-circle {\n  border-radius: 50% !important;\n}\n\n.rounded-pill {\n  border-radius: 50rem !important;\n}\n\n.rounded-0 {\n  border-radius: 0 !important;\n}\n\n.clearfix::after {\n  display: block;\n  clear: both;\n  content: \"\";\n}\n\n.d-none {\n  display: none !important;\n}\n\n.d-inline {\n  display: inline !important;\n}\n\n.d-inline-block {\n  display: inline-block !important;\n}\n\n.d-block {\n  display: block !important;\n}\n\n.d-table {\n  display: table !important;\n}\n\n.d-table-row {\n  display: table-row !important;\n}\n\n.d-table-cell {\n  display: table-cell !important;\n}\n\n.d-flex {\n  display: -webkit-box !important;\n  display: flex !important;\n}\n\n.d-inline-flex {\n  display: -webkit-inline-box !important;\n  display: inline-flex !important;\n}\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important;\n  }\n\n  .d-sm-inline {\n    display: inline !important;\n  }\n\n  .d-sm-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-sm-block {\n    display: block !important;\n  }\n\n  .d-sm-table {\n    display: table !important;\n  }\n\n  .d-sm-table-row {\n    display: table-row !important;\n  }\n\n  .d-sm-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-sm-flex {\n    display: -webkit-box !important;\n    display: flex !important;\n  }\n\n  .d-sm-inline-flex {\n    display: -webkit-inline-box !important;\n    display: inline-flex !important;\n  }\n}\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important;\n  }\n\n  .d-md-inline {\n    display: inline !important;\n  }\n\n  .d-md-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-md-block {\n    display: block !important;\n  }\n\n  .d-md-table {\n    display: table !important;\n  }\n\n  .d-md-table-row {\n    display: table-row !important;\n  }\n\n  .d-md-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-md-flex {\n    display: -webkit-box !important;\n    display: flex !important;\n  }\n\n  .d-md-inline-flex {\n    display: -webkit-inline-box !important;\n    display: inline-flex !important;\n  }\n}\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important;\n  }\n\n  .d-lg-inline {\n    display: inline !important;\n  }\n\n  .d-lg-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-lg-block {\n    display: block !important;\n  }\n\n  .d-lg-table {\n    display: table !important;\n  }\n\n  .d-lg-table-row {\n    display: table-row !important;\n  }\n\n  .d-lg-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-lg-flex {\n    display: -webkit-box !important;\n    display: flex !important;\n  }\n\n  .d-lg-inline-flex {\n    display: -webkit-inline-box !important;\n    display: inline-flex !important;\n  }\n}\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important;\n  }\n\n  .d-xl-inline {\n    display: inline !important;\n  }\n\n  .d-xl-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-xl-block {\n    display: block !important;\n  }\n\n  .d-xl-table {\n    display: table !important;\n  }\n\n  .d-xl-table-row {\n    display: table-row !important;\n  }\n\n  .d-xl-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-xl-flex {\n    display: -webkit-box !important;\n    display: flex !important;\n  }\n\n  .d-xl-inline-flex {\n    display: -webkit-inline-box !important;\n    display: inline-flex !important;\n  }\n}\n@media print {\n  .d-print-none {\n    display: none !important;\n  }\n\n  .d-print-inline {\n    display: inline !important;\n  }\n\n  .d-print-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-print-block {\n    display: block !important;\n  }\n\n  .d-print-table {\n    display: table !important;\n  }\n\n  .d-print-table-row {\n    display: table-row !important;\n  }\n\n  .d-print-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-print-flex {\n    display: -webkit-box !important;\n    display: flex !important;\n  }\n\n  .d-print-inline-flex {\n    display: -webkit-inline-box !important;\n    display: inline-flex !important;\n  }\n}\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden;\n}\n.embed-responsive::before {\n  display: block;\n  content: \"\";\n}\n.embed-responsive .embed-responsive-item,\n.embed-responsive iframe,\n.embed-responsive embed,\n.embed-responsive object,\n.embed-responsive video {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n\n.embed-responsive-21by9::before {\n  padding-top: 42.8571428571%;\n}\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%;\n}\n\n.embed-responsive-4by3::before {\n  padding-top: 75%;\n}\n\n.embed-responsive-1by1::before {\n  padding-top: 100%;\n}\n\n.flex-row {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: normal !important;\n          flex-direction: row !important;\n}\n\n.flex-column {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: normal !important;\n          flex-direction: column !important;\n}\n\n.flex-row-reverse {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: reverse !important;\n          flex-direction: row-reverse !important;\n}\n\n.flex-column-reverse {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: reverse !important;\n          flex-direction: column-reverse !important;\n}\n\n.flex-wrap {\n  flex-wrap: wrap !important;\n}\n\n.flex-nowrap {\n  flex-wrap: nowrap !important;\n}\n\n.flex-wrap-reverse {\n  flex-wrap: wrap-reverse !important;\n}\n\n.flex-fill {\n  -webkit-box-flex: 1 !important;\n          flex: 1 1 auto !important;\n}\n\n.flex-grow-0 {\n  -webkit-box-flex: 0 !important;\n          flex-grow: 0 !important;\n}\n\n.flex-grow-1 {\n  -webkit-box-flex: 1 !important;\n          flex-grow: 1 !important;\n}\n\n.flex-shrink-0 {\n  flex-shrink: 0 !important;\n}\n\n.flex-shrink-1 {\n  flex-shrink: 1 !important;\n}\n\n.justify-content-start {\n  -webkit-box-pack: start !important;\n          justify-content: flex-start !important;\n}\n\n.justify-content-end {\n  -webkit-box-pack: end !important;\n          justify-content: flex-end !important;\n}\n\n.justify-content-center {\n  -webkit-box-pack: center !important;\n          justify-content: center !important;\n}\n\n.justify-content-between {\n  -webkit-box-pack: justify !important;\n          justify-content: space-between !important;\n}\n\n.justify-content-around {\n  justify-content: space-around !important;\n}\n\n.align-items-start {\n  -webkit-box-align: start !important;\n          align-items: flex-start !important;\n}\n\n.align-items-end {\n  -webkit-box-align: end !important;\n          align-items: flex-end !important;\n}\n\n.align-items-center {\n  -webkit-box-align: center !important;\n          align-items: center !important;\n}\n\n.align-items-baseline {\n  -webkit-box-align: baseline !important;\n          align-items: baseline !important;\n}\n\n.align-items-stretch {\n  -webkit-box-align: stretch !important;\n          align-items: stretch !important;\n}\n\n.align-content-start {\n  align-content: flex-start !important;\n}\n\n.align-content-end {\n  align-content: flex-end !important;\n}\n\n.align-content-center {\n  align-content: center !important;\n}\n\n.align-content-between {\n  align-content: space-between !important;\n}\n\n.align-content-around {\n  align-content: space-around !important;\n}\n\n.align-content-stretch {\n  align-content: stretch !important;\n}\n\n.align-self-auto {\n  align-self: auto !important;\n}\n\n.align-self-start {\n  align-self: flex-start !important;\n}\n\n.align-self-end {\n  align-self: flex-end !important;\n}\n\n.align-self-center {\n  align-self: center !important;\n}\n\n.align-self-baseline {\n  align-self: baseline !important;\n}\n\n.align-self-stretch {\n  align-self: stretch !important;\n}\n\n@media (min-width: 576px) {\n  .flex-sm-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n            flex-direction: row !important;\n  }\n\n  .flex-sm-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n            flex-direction: column !important;\n  }\n\n  .flex-sm-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n            flex-direction: row-reverse !important;\n  }\n\n  .flex-sm-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n            flex-direction: column-reverse !important;\n  }\n\n  .flex-sm-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-sm-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-sm-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .flex-sm-fill {\n    -webkit-box-flex: 1 !important;\n            flex: 1 1 auto !important;\n  }\n\n  .flex-sm-grow-0 {\n    -webkit-box-flex: 0 !important;\n            flex-grow: 0 !important;\n  }\n\n  .flex-sm-grow-1 {\n    -webkit-box-flex: 1 !important;\n            flex-grow: 1 !important;\n  }\n\n  .flex-sm-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-sm-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .justify-content-sm-start {\n    -webkit-box-pack: start !important;\n            justify-content: flex-start !important;\n  }\n\n  .justify-content-sm-end {\n    -webkit-box-pack: end !important;\n            justify-content: flex-end !important;\n  }\n\n  .justify-content-sm-center {\n    -webkit-box-pack: center !important;\n            justify-content: center !important;\n  }\n\n  .justify-content-sm-between {\n    -webkit-box-pack: justify !important;\n            justify-content: space-between !important;\n  }\n\n  .justify-content-sm-around {\n    justify-content: space-around !important;\n  }\n\n  .align-items-sm-start {\n    -webkit-box-align: start !important;\n            align-items: flex-start !important;\n  }\n\n  .align-items-sm-end {\n    -webkit-box-align: end !important;\n            align-items: flex-end !important;\n  }\n\n  .align-items-sm-center {\n    -webkit-box-align: center !important;\n            align-items: center !important;\n  }\n\n  .align-items-sm-baseline {\n    -webkit-box-align: baseline !important;\n            align-items: baseline !important;\n  }\n\n  .align-items-sm-stretch {\n    -webkit-box-align: stretch !important;\n            align-items: stretch !important;\n  }\n\n  .align-content-sm-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-sm-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-sm-center {\n    align-content: center !important;\n  }\n\n  .align-content-sm-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-sm-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-sm-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-sm-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-sm-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-sm-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-sm-center {\n    align-self: center !important;\n  }\n\n  .align-self-sm-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-sm-stretch {\n    align-self: stretch !important;\n  }\n}\n@media (min-width: 768px) {\n  .flex-md-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n            flex-direction: row !important;\n  }\n\n  .flex-md-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n            flex-direction: column !important;\n  }\n\n  .flex-md-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n            flex-direction: row-reverse !important;\n  }\n\n  .flex-md-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n            flex-direction: column-reverse !important;\n  }\n\n  .flex-md-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-md-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-md-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .flex-md-fill {\n    -webkit-box-flex: 1 !important;\n            flex: 1 1 auto !important;\n  }\n\n  .flex-md-grow-0 {\n    -webkit-box-flex: 0 !important;\n            flex-grow: 0 !important;\n  }\n\n  .flex-md-grow-1 {\n    -webkit-box-flex: 1 !important;\n            flex-grow: 1 !important;\n  }\n\n  .flex-md-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-md-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .justify-content-md-start {\n    -webkit-box-pack: start !important;\n            justify-content: flex-start !important;\n  }\n\n  .justify-content-md-end {\n    -webkit-box-pack: end !important;\n            justify-content: flex-end !important;\n  }\n\n  .justify-content-md-center {\n    -webkit-box-pack: center !important;\n            justify-content: center !important;\n  }\n\n  .justify-content-md-between {\n    -webkit-box-pack: justify !important;\n            justify-content: space-between !important;\n  }\n\n  .justify-content-md-around {\n    justify-content: space-around !important;\n  }\n\n  .align-items-md-start {\n    -webkit-box-align: start !important;\n            align-items: flex-start !important;\n  }\n\n  .align-items-md-end {\n    -webkit-box-align: end !important;\n            align-items: flex-end !important;\n  }\n\n  .align-items-md-center {\n    -webkit-box-align: center !important;\n            align-items: center !important;\n  }\n\n  .align-items-md-baseline {\n    -webkit-box-align: baseline !important;\n            align-items: baseline !important;\n  }\n\n  .align-items-md-stretch {\n    -webkit-box-align: stretch !important;\n            align-items: stretch !important;\n  }\n\n  .align-content-md-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-md-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-md-center {\n    align-content: center !important;\n  }\n\n  .align-content-md-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-md-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-md-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-md-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-md-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-md-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-md-center {\n    align-self: center !important;\n  }\n\n  .align-self-md-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-md-stretch {\n    align-self: stretch !important;\n  }\n}\n@media (min-width: 992px) {\n  .flex-lg-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n            flex-direction: row !important;\n  }\n\n  .flex-lg-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n            flex-direction: column !important;\n  }\n\n  .flex-lg-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n            flex-direction: row-reverse !important;\n  }\n\n  .flex-lg-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n            flex-direction: column-reverse !important;\n  }\n\n  .flex-lg-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-lg-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-lg-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .flex-lg-fill {\n    -webkit-box-flex: 1 !important;\n            flex: 1 1 auto !important;\n  }\n\n  .flex-lg-grow-0 {\n    -webkit-box-flex: 0 !important;\n            flex-grow: 0 !important;\n  }\n\n  .flex-lg-grow-1 {\n    -webkit-box-flex: 1 !important;\n            flex-grow: 1 !important;\n  }\n\n  .flex-lg-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-lg-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .justify-content-lg-start {\n    -webkit-box-pack: start !important;\n            justify-content: flex-start !important;\n  }\n\n  .justify-content-lg-end {\n    -webkit-box-pack: end !important;\n            justify-content: flex-end !important;\n  }\n\n  .justify-content-lg-center {\n    -webkit-box-pack: center !important;\n            justify-content: center !important;\n  }\n\n  .justify-content-lg-between {\n    -webkit-box-pack: justify !important;\n            justify-content: space-between !important;\n  }\n\n  .justify-content-lg-around {\n    justify-content: space-around !important;\n  }\n\n  .align-items-lg-start {\n    -webkit-box-align: start !important;\n            align-items: flex-start !important;\n  }\n\n  .align-items-lg-end {\n    -webkit-box-align: end !important;\n            align-items: flex-end !important;\n  }\n\n  .align-items-lg-center {\n    -webkit-box-align: center !important;\n            align-items: center !important;\n  }\n\n  .align-items-lg-baseline {\n    -webkit-box-align: baseline !important;\n            align-items: baseline !important;\n  }\n\n  .align-items-lg-stretch {\n    -webkit-box-align: stretch !important;\n            align-items: stretch !important;\n  }\n\n  .align-content-lg-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-lg-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-lg-center {\n    align-content: center !important;\n  }\n\n  .align-content-lg-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-lg-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-lg-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-lg-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-lg-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-lg-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-lg-center {\n    align-self: center !important;\n  }\n\n  .align-self-lg-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-lg-stretch {\n    align-self: stretch !important;\n  }\n}\n@media (min-width: 1200px) {\n  .flex-xl-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n            flex-direction: row !important;\n  }\n\n  .flex-xl-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n            flex-direction: column !important;\n  }\n\n  .flex-xl-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n            flex-direction: row-reverse !important;\n  }\n\n  .flex-xl-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n            flex-direction: column-reverse !important;\n  }\n\n  .flex-xl-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-xl-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-xl-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .flex-xl-fill {\n    -webkit-box-flex: 1 !important;\n            flex: 1 1 auto !important;\n  }\n\n  .flex-xl-grow-0 {\n    -webkit-box-flex: 0 !important;\n            flex-grow: 0 !important;\n  }\n\n  .flex-xl-grow-1 {\n    -webkit-box-flex: 1 !important;\n            flex-grow: 1 !important;\n  }\n\n  .flex-xl-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-xl-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .justify-content-xl-start {\n    -webkit-box-pack: start !important;\n            justify-content: flex-start !important;\n  }\n\n  .justify-content-xl-end {\n    -webkit-box-pack: end !important;\n            justify-content: flex-end !important;\n  }\n\n  .justify-content-xl-center {\n    -webkit-box-pack: center !important;\n            justify-content: center !important;\n  }\n\n  .justify-content-xl-between {\n    -webkit-box-pack: justify !important;\n            justify-content: space-between !important;\n  }\n\n  .justify-content-xl-around {\n    justify-content: space-around !important;\n  }\n\n  .align-items-xl-start {\n    -webkit-box-align: start !important;\n            align-items: flex-start !important;\n  }\n\n  .align-items-xl-end {\n    -webkit-box-align: end !important;\n            align-items: flex-end !important;\n  }\n\n  .align-items-xl-center {\n    -webkit-box-align: center !important;\n            align-items: center !important;\n  }\n\n  .align-items-xl-baseline {\n    -webkit-box-align: baseline !important;\n            align-items: baseline !important;\n  }\n\n  .align-items-xl-stretch {\n    -webkit-box-align: stretch !important;\n            align-items: stretch !important;\n  }\n\n  .align-content-xl-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-xl-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-xl-center {\n    align-content: center !important;\n  }\n\n  .align-content-xl-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-xl-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-xl-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-xl-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-xl-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-xl-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-xl-center {\n    align-self: center !important;\n  }\n\n  .align-self-xl-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-xl-stretch {\n    align-self: stretch !important;\n  }\n}\n.float-left {\n  float: left !important;\n}\n\n.float-right {\n  float: right !important;\n}\n\n.float-none {\n  float: none !important;\n}\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important;\n  }\n\n  .float-sm-right {\n    float: right !important;\n  }\n\n  .float-sm-none {\n    float: none !important;\n  }\n}\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important;\n  }\n\n  .float-md-right {\n    float: right !important;\n  }\n\n  .float-md-none {\n    float: none !important;\n  }\n}\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important;\n  }\n\n  .float-lg-right {\n    float: right !important;\n  }\n\n  .float-lg-none {\n    float: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important;\n  }\n\n  .float-xl-right {\n    float: right !important;\n  }\n\n  .float-xl-none {\n    float: none !important;\n  }\n}\n.overflow-auto {\n  overflow: auto !important;\n}\n\n.overflow-hidden {\n  overflow: hidden !important;\n}\n\n.position-static {\n  position: static !important;\n}\n\n.position-relative {\n  position: relative !important;\n}\n\n.position-absolute {\n  position: absolute !important;\n}\n\n.position-fixed {\n  position: fixed !important;\n}\n\n.position-sticky {\n  position: -webkit-sticky !important;\n  position: sticky !important;\n}\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n@supports ((position: -webkit-sticky) or (position: sticky)) {\n  .sticky-top {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n  }\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  overflow: visible;\n  clip: auto;\n  white-space: normal;\n}\n\n.shadow-sm {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;\n}\n\n.shadow {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;\n}\n\n.shadow-lg {\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;\n}\n\n.shadow-none {\n  box-shadow: none !important;\n}\n\n.w-25 {\n  width: 25% !important;\n}\n\n.w-50 {\n  width: 50% !important;\n}\n\n.w-75 {\n  width: 75% !important;\n}\n\n.w-100 {\n  width: 100% !important;\n}\n\n.w-auto {\n  width: auto !important;\n}\n\n.h-25 {\n  height: 25% !important;\n}\n\n.h-50 {\n  height: 50% !important;\n}\n\n.h-75 {\n  height: 75% !important;\n}\n\n.h-100 {\n  height: 100% !important;\n}\n\n.h-auto {\n  height: auto !important;\n}\n\n.mw-100 {\n  max-width: 100% !important;\n}\n\n.mh-100 {\n  max-height: 100% !important;\n}\n\n.min-vw-100 {\n  min-width: 100vw !important;\n}\n\n.min-vh-100 {\n  min-height: 100vh !important;\n}\n\n.vw-100 {\n  width: 100vw !important;\n}\n\n.vh-100 {\n  height: 100vh !important;\n}\n\n.stretched-link::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  pointer-events: auto;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0);\n}\n\n.m-0 {\n  margin: 0 !important;\n}\n\n.mt-0,\n.my-0 {\n  margin-top: 0 !important;\n}\n\n.mr-0,\n.mx-0 {\n  margin-right: 0 !important;\n}\n\n.mb-0,\n.my-0 {\n  margin-bottom: 0 !important;\n}\n\n.ml-0,\n.mx-0 {\n  margin-left: 0 !important;\n}\n\n.m-1 {\n  margin: 0.25rem !important;\n}\n\n.mt-1,\n.my-1 {\n  margin-top: 0.25rem !important;\n}\n\n.mr-1,\n.mx-1 {\n  margin-right: 0.25rem !important;\n}\n\n.mb-1,\n.my-1 {\n  margin-bottom: 0.25rem !important;\n}\n\n.ml-1,\n.mx-1 {\n  margin-left: 0.25rem !important;\n}\n\n.m-2 {\n  margin: 0.5rem !important;\n}\n\n.mt-2,\n.my-2 {\n  margin-top: 0.5rem !important;\n}\n\n.mr-2,\n.mx-2 {\n  margin-right: 0.5rem !important;\n}\n\n.mb-2,\n.my-2 {\n  margin-bottom: 0.5rem !important;\n}\n\n.ml-2,\n.mx-2 {\n  margin-left: 0.5rem !important;\n}\n\n.m-3 {\n  margin: 1rem !important;\n}\n\n.mt-3,\n.my-3 {\n  margin-top: 1rem !important;\n}\n\n.mr-3,\n.mx-3 {\n  margin-right: 1rem !important;\n}\n\n.mb-3,\n.my-3 {\n  margin-bottom: 1rem !important;\n}\n\n.ml-3,\n.mx-3 {\n  margin-left: 1rem !important;\n}\n\n.m-4 {\n  margin: 1.5rem !important;\n}\n\n.mt-4,\n.my-4 {\n  margin-top: 1.5rem !important;\n}\n\n.mr-4,\n.mx-4 {\n  margin-right: 1.5rem !important;\n}\n\n.mb-4,\n.my-4 {\n  margin-bottom: 1.5rem !important;\n}\n\n.ml-4,\n.mx-4 {\n  margin-left: 1.5rem !important;\n}\n\n.m-5 {\n  margin: 3rem !important;\n}\n\n.mt-5,\n.my-5 {\n  margin-top: 3rem !important;\n}\n\n.mr-5,\n.mx-5 {\n  margin-right: 3rem !important;\n}\n\n.mb-5,\n.my-5 {\n  margin-bottom: 3rem !important;\n}\n\n.ml-5,\n.mx-5 {\n  margin-left: 3rem !important;\n}\n\n.p-0 {\n  padding: 0 !important;\n}\n\n.pt-0,\n.py-0 {\n  padding-top: 0 !important;\n}\n\n.pr-0,\n.px-0 {\n  padding-right: 0 !important;\n}\n\n.pb-0,\n.py-0 {\n  padding-bottom: 0 !important;\n}\n\n.pl-0,\n.px-0 {\n  padding-left: 0 !important;\n}\n\n.p-1 {\n  padding: 0.25rem !important;\n}\n\n.pt-1,\n.py-1 {\n  padding-top: 0.25rem !important;\n}\n\n.pr-1,\n.px-1 {\n  padding-right: 0.25rem !important;\n}\n\n.pb-1,\n.py-1 {\n  padding-bottom: 0.25rem !important;\n}\n\n.pl-1,\n.px-1 {\n  padding-left: 0.25rem !important;\n}\n\n.p-2 {\n  padding: 0.5rem !important;\n}\n\n.pt-2,\n.py-2 {\n  padding-top: 0.5rem !important;\n}\n\n.pr-2,\n.px-2 {\n  padding-right: 0.5rem !important;\n}\n\n.pb-2,\n.py-2 {\n  padding-bottom: 0.5rem !important;\n}\n\n.pl-2,\n.px-2 {\n  padding-left: 0.5rem !important;\n}\n\n.p-3 {\n  padding: 1rem !important;\n}\n\n.pt-3,\n.py-3 {\n  padding-top: 1rem !important;\n}\n\n.pr-3,\n.px-3 {\n  padding-right: 1rem !important;\n}\n\n.pb-3,\n.py-3 {\n  padding-bottom: 1rem !important;\n}\n\n.pl-3,\n.px-3 {\n  padding-left: 1rem !important;\n}\n\n.p-4 {\n  padding: 1.5rem !important;\n}\n\n.pt-4,\n.py-4 {\n  padding-top: 1.5rem !important;\n}\n\n.pr-4,\n.px-4 {\n  padding-right: 1.5rem !important;\n}\n\n.pb-4,\n.py-4 {\n  padding-bottom: 1.5rem !important;\n}\n\n.pl-4,\n.px-4 {\n  padding-left: 1.5rem !important;\n}\n\n.p-5 {\n  padding: 3rem !important;\n}\n\n.pt-5,\n.py-5 {\n  padding-top: 3rem !important;\n}\n\n.pr-5,\n.px-5 {\n  padding-right: 3rem !important;\n}\n\n.pb-5,\n.py-5 {\n  padding-bottom: 3rem !important;\n}\n\n.pl-5,\n.px-5 {\n  padding-left: 3rem !important;\n}\n\n.m-n1 {\n  margin: -0.25rem !important;\n}\n\n.mt-n1,\n.my-n1 {\n  margin-top: -0.25rem !important;\n}\n\n.mr-n1,\n.mx-n1 {\n  margin-right: -0.25rem !important;\n}\n\n.mb-n1,\n.my-n1 {\n  margin-bottom: -0.25rem !important;\n}\n\n.ml-n1,\n.mx-n1 {\n  margin-left: -0.25rem !important;\n}\n\n.m-n2 {\n  margin: -0.5rem !important;\n}\n\n.mt-n2,\n.my-n2 {\n  margin-top: -0.5rem !important;\n}\n\n.mr-n2,\n.mx-n2 {\n  margin-right: -0.5rem !important;\n}\n\n.mb-n2,\n.my-n2 {\n  margin-bottom: -0.5rem !important;\n}\n\n.ml-n2,\n.mx-n2 {\n  margin-left: -0.5rem !important;\n}\n\n.m-n3 {\n  margin: -1rem !important;\n}\n\n.mt-n3,\n.my-n3 {\n  margin-top: -1rem !important;\n}\n\n.mr-n3,\n.mx-n3 {\n  margin-right: -1rem !important;\n}\n\n.mb-n3,\n.my-n3 {\n  margin-bottom: -1rem !important;\n}\n\n.ml-n3,\n.mx-n3 {\n  margin-left: -1rem !important;\n}\n\n.m-n4 {\n  margin: -1.5rem !important;\n}\n\n.mt-n4,\n.my-n4 {\n  margin-top: -1.5rem !important;\n}\n\n.mr-n4,\n.mx-n4 {\n  margin-right: -1.5rem !important;\n}\n\n.mb-n4,\n.my-n4 {\n  margin-bottom: -1.5rem !important;\n}\n\n.ml-n4,\n.mx-n4 {\n  margin-left: -1.5rem !important;\n}\n\n.m-n5 {\n  margin: -3rem !important;\n}\n\n.mt-n5,\n.my-n5 {\n  margin-top: -3rem !important;\n}\n\n.mr-n5,\n.mx-n5 {\n  margin-right: -3rem !important;\n}\n\n.mb-n5,\n.my-n5 {\n  margin-bottom: -3rem !important;\n}\n\n.ml-n5,\n.mx-n5 {\n  margin-left: -3rem !important;\n}\n\n.m-auto {\n  margin: auto !important;\n}\n\n.mt-auto,\n.my-auto {\n  margin-top: auto !important;\n}\n\n.mr-auto,\n.mx-auto {\n  margin-right: auto !important;\n}\n\n.mb-auto,\n.my-auto {\n  margin-bottom: auto !important;\n}\n\n.ml-auto,\n.mx-auto {\n  margin-left: auto !important;\n}\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 !important;\n  }\n\n  .mt-sm-0,\n.my-sm-0 {\n    margin-top: 0 !important;\n  }\n\n  .mr-sm-0,\n.mx-sm-0 {\n    margin-right: 0 !important;\n  }\n\n  .mb-sm-0,\n.my-sm-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .ml-sm-0,\n.mx-sm-0 {\n    margin-left: 0 !important;\n  }\n\n  .m-sm-1 {\n    margin: 0.25rem !important;\n  }\n\n  .mt-sm-1,\n.my-sm-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mr-sm-1,\n.mx-sm-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .mb-sm-1,\n.my-sm-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .ml-sm-1,\n.mx-sm-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .m-sm-2 {\n    margin: 0.5rem !important;\n  }\n\n  .mt-sm-2,\n.my-sm-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mr-sm-2,\n.mx-sm-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .mb-sm-2,\n.my-sm-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .ml-sm-2,\n.mx-sm-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .m-sm-3 {\n    margin: 1rem !important;\n  }\n\n  .mt-sm-3,\n.my-sm-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mr-sm-3,\n.mx-sm-3 {\n    margin-right: 1rem !important;\n  }\n\n  .mb-sm-3,\n.my-sm-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .ml-sm-3,\n.mx-sm-3 {\n    margin-left: 1rem !important;\n  }\n\n  .m-sm-4 {\n    margin: 1.5rem !important;\n  }\n\n  .mt-sm-4,\n.my-sm-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mr-sm-4,\n.mx-sm-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .mb-sm-4,\n.my-sm-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .ml-sm-4,\n.mx-sm-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .m-sm-5 {\n    margin: 3rem !important;\n  }\n\n  .mt-sm-5,\n.my-sm-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mr-sm-5,\n.mx-sm-5 {\n    margin-right: 3rem !important;\n  }\n\n  .mb-sm-5,\n.my-sm-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .ml-sm-5,\n.mx-sm-5 {\n    margin-left: 3rem !important;\n  }\n\n  .p-sm-0 {\n    padding: 0 !important;\n  }\n\n  .pt-sm-0,\n.py-sm-0 {\n    padding-top: 0 !important;\n  }\n\n  .pr-sm-0,\n.px-sm-0 {\n    padding-right: 0 !important;\n  }\n\n  .pb-sm-0,\n.py-sm-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pl-sm-0,\n.px-sm-0 {\n    padding-left: 0 !important;\n  }\n\n  .p-sm-1 {\n    padding: 0.25rem !important;\n  }\n\n  .pt-sm-1,\n.py-sm-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pr-sm-1,\n.px-sm-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pb-sm-1,\n.py-sm-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pl-sm-1,\n.px-sm-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .p-sm-2 {\n    padding: 0.5rem !important;\n  }\n\n  .pt-sm-2,\n.py-sm-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pr-sm-2,\n.px-sm-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pb-sm-2,\n.py-sm-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pl-sm-2,\n.px-sm-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .p-sm-3 {\n    padding: 1rem !important;\n  }\n\n  .pt-sm-3,\n.py-sm-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pr-sm-3,\n.px-sm-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pb-sm-3,\n.py-sm-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pl-sm-3,\n.px-sm-3 {\n    padding-left: 1rem !important;\n  }\n\n  .p-sm-4 {\n    padding: 1.5rem !important;\n  }\n\n  .pt-sm-4,\n.py-sm-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pr-sm-4,\n.px-sm-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pb-sm-4,\n.py-sm-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pl-sm-4,\n.px-sm-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .p-sm-5 {\n    padding: 3rem !important;\n  }\n\n  .pt-sm-5,\n.py-sm-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pr-sm-5,\n.px-sm-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-sm-5,\n.py-sm-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .pl-sm-5,\n.px-sm-5 {\n    padding-left: 3rem !important;\n  }\n\n  .m-sm-n1 {\n    margin: -0.25rem !important;\n  }\n\n  .mt-sm-n1,\n.my-sm-n1 {\n    margin-top: -0.25rem !important;\n  }\n\n  .mr-sm-n1,\n.mx-sm-n1 {\n    margin-right: -0.25rem !important;\n  }\n\n  .mb-sm-n1,\n.my-sm-n1 {\n    margin-bottom: -0.25rem !important;\n  }\n\n  .ml-sm-n1,\n.mx-sm-n1 {\n    margin-left: -0.25rem !important;\n  }\n\n  .m-sm-n2 {\n    margin: -0.5rem !important;\n  }\n\n  .mt-sm-n2,\n.my-sm-n2 {\n    margin-top: -0.5rem !important;\n  }\n\n  .mr-sm-n2,\n.mx-sm-n2 {\n    margin-right: -0.5rem !important;\n  }\n\n  .mb-sm-n2,\n.my-sm-n2 {\n    margin-bottom: -0.5rem !important;\n  }\n\n  .ml-sm-n2,\n.mx-sm-n2 {\n    margin-left: -0.5rem !important;\n  }\n\n  .m-sm-n3 {\n    margin: -1rem !important;\n  }\n\n  .mt-sm-n3,\n.my-sm-n3 {\n    margin-top: -1rem !important;\n  }\n\n  .mr-sm-n3,\n.mx-sm-n3 {\n    margin-right: -1rem !important;\n  }\n\n  .mb-sm-n3,\n.my-sm-n3 {\n    margin-bottom: -1rem !important;\n  }\n\n  .ml-sm-n3,\n.mx-sm-n3 {\n    margin-left: -1rem !important;\n  }\n\n  .m-sm-n4 {\n    margin: -1.5rem !important;\n  }\n\n  .mt-sm-n4,\n.my-sm-n4 {\n    margin-top: -1.5rem !important;\n  }\n\n  .mr-sm-n4,\n.mx-sm-n4 {\n    margin-right: -1.5rem !important;\n  }\n\n  .mb-sm-n4,\n.my-sm-n4 {\n    margin-bottom: -1.5rem !important;\n  }\n\n  .ml-sm-n4,\n.mx-sm-n4 {\n    margin-left: -1.5rem !important;\n  }\n\n  .m-sm-n5 {\n    margin: -3rem !important;\n  }\n\n  .mt-sm-n5,\n.my-sm-n5 {\n    margin-top: -3rem !important;\n  }\n\n  .mr-sm-n5,\n.mx-sm-n5 {\n    margin-right: -3rem !important;\n  }\n\n  .mb-sm-n5,\n.my-sm-n5 {\n    margin-bottom: -3rem !important;\n  }\n\n  .ml-sm-n5,\n.mx-sm-n5 {\n    margin-left: -3rem !important;\n  }\n\n  .m-sm-auto {\n    margin: auto !important;\n  }\n\n  .mt-sm-auto,\n.my-sm-auto {\n    margin-top: auto !important;\n  }\n\n  .mr-sm-auto,\n.mx-sm-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-sm-auto,\n.my-sm-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ml-sm-auto,\n.mx-sm-auto {\n    margin-left: auto !important;\n  }\n}\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 !important;\n  }\n\n  .mt-md-0,\n.my-md-0 {\n    margin-top: 0 !important;\n  }\n\n  .mr-md-0,\n.mx-md-0 {\n    margin-right: 0 !important;\n  }\n\n  .mb-md-0,\n.my-md-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .ml-md-0,\n.mx-md-0 {\n    margin-left: 0 !important;\n  }\n\n  .m-md-1 {\n    margin: 0.25rem !important;\n  }\n\n  .mt-md-1,\n.my-md-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mr-md-1,\n.mx-md-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .mb-md-1,\n.my-md-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .ml-md-1,\n.mx-md-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .m-md-2 {\n    margin: 0.5rem !important;\n  }\n\n  .mt-md-2,\n.my-md-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mr-md-2,\n.mx-md-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .mb-md-2,\n.my-md-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .ml-md-2,\n.mx-md-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .m-md-3 {\n    margin: 1rem !important;\n  }\n\n  .mt-md-3,\n.my-md-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mr-md-3,\n.mx-md-3 {\n    margin-right: 1rem !important;\n  }\n\n  .mb-md-3,\n.my-md-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .ml-md-3,\n.mx-md-3 {\n    margin-left: 1rem !important;\n  }\n\n  .m-md-4 {\n    margin: 1.5rem !important;\n  }\n\n  .mt-md-4,\n.my-md-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mr-md-4,\n.mx-md-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .mb-md-4,\n.my-md-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .ml-md-4,\n.mx-md-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .m-md-5 {\n    margin: 3rem !important;\n  }\n\n  .mt-md-5,\n.my-md-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mr-md-5,\n.mx-md-5 {\n    margin-right: 3rem !important;\n  }\n\n  .mb-md-5,\n.my-md-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .ml-md-5,\n.mx-md-5 {\n    margin-left: 3rem !important;\n  }\n\n  .p-md-0 {\n    padding: 0 !important;\n  }\n\n  .pt-md-0,\n.py-md-0 {\n    padding-top: 0 !important;\n  }\n\n  .pr-md-0,\n.px-md-0 {\n    padding-right: 0 !important;\n  }\n\n  .pb-md-0,\n.py-md-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pl-md-0,\n.px-md-0 {\n    padding-left: 0 !important;\n  }\n\n  .p-md-1 {\n    padding: 0.25rem !important;\n  }\n\n  .pt-md-1,\n.py-md-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pr-md-1,\n.px-md-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pb-md-1,\n.py-md-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pl-md-1,\n.px-md-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .p-md-2 {\n    padding: 0.5rem !important;\n  }\n\n  .pt-md-2,\n.py-md-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pr-md-2,\n.px-md-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pb-md-2,\n.py-md-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pl-md-2,\n.px-md-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .p-md-3 {\n    padding: 1rem !important;\n  }\n\n  .pt-md-3,\n.py-md-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pr-md-3,\n.px-md-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pb-md-3,\n.py-md-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pl-md-3,\n.px-md-3 {\n    padding-left: 1rem !important;\n  }\n\n  .p-md-4 {\n    padding: 1.5rem !important;\n  }\n\n  .pt-md-4,\n.py-md-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pr-md-4,\n.px-md-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pb-md-4,\n.py-md-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pl-md-4,\n.px-md-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .p-md-5 {\n    padding: 3rem !important;\n  }\n\n  .pt-md-5,\n.py-md-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pr-md-5,\n.px-md-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-md-5,\n.py-md-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .pl-md-5,\n.px-md-5 {\n    padding-left: 3rem !important;\n  }\n\n  .m-md-n1 {\n    margin: -0.25rem !important;\n  }\n\n  .mt-md-n1,\n.my-md-n1 {\n    margin-top: -0.25rem !important;\n  }\n\n  .mr-md-n1,\n.mx-md-n1 {\n    margin-right: -0.25rem !important;\n  }\n\n  .mb-md-n1,\n.my-md-n1 {\n    margin-bottom: -0.25rem !important;\n  }\n\n  .ml-md-n1,\n.mx-md-n1 {\n    margin-left: -0.25rem !important;\n  }\n\n  .m-md-n2 {\n    margin: -0.5rem !important;\n  }\n\n  .mt-md-n2,\n.my-md-n2 {\n    margin-top: -0.5rem !important;\n  }\n\n  .mr-md-n2,\n.mx-md-n2 {\n    margin-right: -0.5rem !important;\n  }\n\n  .mb-md-n2,\n.my-md-n2 {\n    margin-bottom: -0.5rem !important;\n  }\n\n  .ml-md-n2,\n.mx-md-n2 {\n    margin-left: -0.5rem !important;\n  }\n\n  .m-md-n3 {\n    margin: -1rem !important;\n  }\n\n  .mt-md-n3,\n.my-md-n3 {\n    margin-top: -1rem !important;\n  }\n\n  .mr-md-n3,\n.mx-md-n3 {\n    margin-right: -1rem !important;\n  }\n\n  .mb-md-n3,\n.my-md-n3 {\n    margin-bottom: -1rem !important;\n  }\n\n  .ml-md-n3,\n.mx-md-n3 {\n    margin-left: -1rem !important;\n  }\n\n  .m-md-n4 {\n    margin: -1.5rem !important;\n  }\n\n  .mt-md-n4,\n.my-md-n4 {\n    margin-top: -1.5rem !important;\n  }\n\n  .mr-md-n4,\n.mx-md-n4 {\n    margin-right: -1.5rem !important;\n  }\n\n  .mb-md-n4,\n.my-md-n4 {\n    margin-bottom: -1.5rem !important;\n  }\n\n  .ml-md-n4,\n.mx-md-n4 {\n    margin-left: -1.5rem !important;\n  }\n\n  .m-md-n5 {\n    margin: -3rem !important;\n  }\n\n  .mt-md-n5,\n.my-md-n5 {\n    margin-top: -3rem !important;\n  }\n\n  .mr-md-n5,\n.mx-md-n5 {\n    margin-right: -3rem !important;\n  }\n\n  .mb-md-n5,\n.my-md-n5 {\n    margin-bottom: -3rem !important;\n  }\n\n  .ml-md-n5,\n.mx-md-n5 {\n    margin-left: -3rem !important;\n  }\n\n  .m-md-auto {\n    margin: auto !important;\n  }\n\n  .mt-md-auto,\n.my-md-auto {\n    margin-top: auto !important;\n  }\n\n  .mr-md-auto,\n.mx-md-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-md-auto,\n.my-md-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ml-md-auto,\n.mx-md-auto {\n    margin-left: auto !important;\n  }\n}\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 !important;\n  }\n\n  .mt-lg-0,\n.my-lg-0 {\n    margin-top: 0 !important;\n  }\n\n  .mr-lg-0,\n.mx-lg-0 {\n    margin-right: 0 !important;\n  }\n\n  .mb-lg-0,\n.my-lg-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .ml-lg-0,\n.mx-lg-0 {\n    margin-left: 0 !important;\n  }\n\n  .m-lg-1 {\n    margin: 0.25rem !important;\n  }\n\n  .mt-lg-1,\n.my-lg-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mr-lg-1,\n.mx-lg-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .mb-lg-1,\n.my-lg-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .ml-lg-1,\n.mx-lg-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .m-lg-2 {\n    margin: 0.5rem !important;\n  }\n\n  .mt-lg-2,\n.my-lg-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mr-lg-2,\n.mx-lg-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .mb-lg-2,\n.my-lg-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .ml-lg-2,\n.mx-lg-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .m-lg-3 {\n    margin: 1rem !important;\n  }\n\n  .mt-lg-3,\n.my-lg-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mr-lg-3,\n.mx-lg-3 {\n    margin-right: 1rem !important;\n  }\n\n  .mb-lg-3,\n.my-lg-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .ml-lg-3,\n.mx-lg-3 {\n    margin-left: 1rem !important;\n  }\n\n  .m-lg-4 {\n    margin: 1.5rem !important;\n  }\n\n  .mt-lg-4,\n.my-lg-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mr-lg-4,\n.mx-lg-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .mb-lg-4,\n.my-lg-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .ml-lg-4,\n.mx-lg-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .m-lg-5 {\n    margin: 3rem !important;\n  }\n\n  .mt-lg-5,\n.my-lg-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mr-lg-5,\n.mx-lg-5 {\n    margin-right: 3rem !important;\n  }\n\n  .mb-lg-5,\n.my-lg-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .ml-lg-5,\n.mx-lg-5 {\n    margin-left: 3rem !important;\n  }\n\n  .p-lg-0 {\n    padding: 0 !important;\n  }\n\n  .pt-lg-0,\n.py-lg-0 {\n    padding-top: 0 !important;\n  }\n\n  .pr-lg-0,\n.px-lg-0 {\n    padding-right: 0 !important;\n  }\n\n  .pb-lg-0,\n.py-lg-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pl-lg-0,\n.px-lg-0 {\n    padding-left: 0 !important;\n  }\n\n  .p-lg-1 {\n    padding: 0.25rem !important;\n  }\n\n  .pt-lg-1,\n.py-lg-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pr-lg-1,\n.px-lg-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pb-lg-1,\n.py-lg-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pl-lg-1,\n.px-lg-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .p-lg-2 {\n    padding: 0.5rem !important;\n  }\n\n  .pt-lg-2,\n.py-lg-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pr-lg-2,\n.px-lg-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pb-lg-2,\n.py-lg-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pl-lg-2,\n.px-lg-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .p-lg-3 {\n    padding: 1rem !important;\n  }\n\n  .pt-lg-3,\n.py-lg-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pr-lg-3,\n.px-lg-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pb-lg-3,\n.py-lg-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pl-lg-3,\n.px-lg-3 {\n    padding-left: 1rem !important;\n  }\n\n  .p-lg-4 {\n    padding: 1.5rem !important;\n  }\n\n  .pt-lg-4,\n.py-lg-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pr-lg-4,\n.px-lg-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pb-lg-4,\n.py-lg-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pl-lg-4,\n.px-lg-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .p-lg-5 {\n    padding: 3rem !important;\n  }\n\n  .pt-lg-5,\n.py-lg-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pr-lg-5,\n.px-lg-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-lg-5,\n.py-lg-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .pl-lg-5,\n.px-lg-5 {\n    padding-left: 3rem !important;\n  }\n\n  .m-lg-n1 {\n    margin: -0.25rem !important;\n  }\n\n  .mt-lg-n1,\n.my-lg-n1 {\n    margin-top: -0.25rem !important;\n  }\n\n  .mr-lg-n1,\n.mx-lg-n1 {\n    margin-right: -0.25rem !important;\n  }\n\n  .mb-lg-n1,\n.my-lg-n1 {\n    margin-bottom: -0.25rem !important;\n  }\n\n  .ml-lg-n1,\n.mx-lg-n1 {\n    margin-left: -0.25rem !important;\n  }\n\n  .m-lg-n2 {\n    margin: -0.5rem !important;\n  }\n\n  .mt-lg-n2,\n.my-lg-n2 {\n    margin-top: -0.5rem !important;\n  }\n\n  .mr-lg-n2,\n.mx-lg-n2 {\n    margin-right: -0.5rem !important;\n  }\n\n  .mb-lg-n2,\n.my-lg-n2 {\n    margin-bottom: -0.5rem !important;\n  }\n\n  .ml-lg-n2,\n.mx-lg-n2 {\n    margin-left: -0.5rem !important;\n  }\n\n  .m-lg-n3 {\n    margin: -1rem !important;\n  }\n\n  .mt-lg-n3,\n.my-lg-n3 {\n    margin-top: -1rem !important;\n  }\n\n  .mr-lg-n3,\n.mx-lg-n3 {\n    margin-right: -1rem !important;\n  }\n\n  .mb-lg-n3,\n.my-lg-n3 {\n    margin-bottom: -1rem !important;\n  }\n\n  .ml-lg-n3,\n.mx-lg-n3 {\n    margin-left: -1rem !important;\n  }\n\n  .m-lg-n4 {\n    margin: -1.5rem !important;\n  }\n\n  .mt-lg-n4,\n.my-lg-n4 {\n    margin-top: -1.5rem !important;\n  }\n\n  .mr-lg-n4,\n.mx-lg-n4 {\n    margin-right: -1.5rem !important;\n  }\n\n  .mb-lg-n4,\n.my-lg-n4 {\n    margin-bottom: -1.5rem !important;\n  }\n\n  .ml-lg-n4,\n.mx-lg-n4 {\n    margin-left: -1.5rem !important;\n  }\n\n  .m-lg-n5 {\n    margin: -3rem !important;\n  }\n\n  .mt-lg-n5,\n.my-lg-n5 {\n    margin-top: -3rem !important;\n  }\n\n  .mr-lg-n5,\n.mx-lg-n5 {\n    margin-right: -3rem !important;\n  }\n\n  .mb-lg-n5,\n.my-lg-n5 {\n    margin-bottom: -3rem !important;\n  }\n\n  .ml-lg-n5,\n.mx-lg-n5 {\n    margin-left: -3rem !important;\n  }\n\n  .m-lg-auto {\n    margin: auto !important;\n  }\n\n  .mt-lg-auto,\n.my-lg-auto {\n    margin-top: auto !important;\n  }\n\n  .mr-lg-auto,\n.mx-lg-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-lg-auto,\n.my-lg-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ml-lg-auto,\n.mx-lg-auto {\n    margin-left: auto !important;\n  }\n}\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 !important;\n  }\n\n  .mt-xl-0,\n.my-xl-0 {\n    margin-top: 0 !important;\n  }\n\n  .mr-xl-0,\n.mx-xl-0 {\n    margin-right: 0 !important;\n  }\n\n  .mb-xl-0,\n.my-xl-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .ml-xl-0,\n.mx-xl-0 {\n    margin-left: 0 !important;\n  }\n\n  .m-xl-1 {\n    margin: 0.25rem !important;\n  }\n\n  .mt-xl-1,\n.my-xl-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mr-xl-1,\n.mx-xl-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .mb-xl-1,\n.my-xl-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .ml-xl-1,\n.mx-xl-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .m-xl-2 {\n    margin: 0.5rem !important;\n  }\n\n  .mt-xl-2,\n.my-xl-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mr-xl-2,\n.mx-xl-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .mb-xl-2,\n.my-xl-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .ml-xl-2,\n.mx-xl-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .m-xl-3 {\n    margin: 1rem !important;\n  }\n\n  .mt-xl-3,\n.my-xl-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mr-xl-3,\n.mx-xl-3 {\n    margin-right: 1rem !important;\n  }\n\n  .mb-xl-3,\n.my-xl-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .ml-xl-3,\n.mx-xl-3 {\n    margin-left: 1rem !important;\n  }\n\n  .m-xl-4 {\n    margin: 1.5rem !important;\n  }\n\n  .mt-xl-4,\n.my-xl-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mr-xl-4,\n.mx-xl-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .mb-xl-4,\n.my-xl-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .ml-xl-4,\n.mx-xl-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .m-xl-5 {\n    margin: 3rem !important;\n  }\n\n  .mt-xl-5,\n.my-xl-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mr-xl-5,\n.mx-xl-5 {\n    margin-right: 3rem !important;\n  }\n\n  .mb-xl-5,\n.my-xl-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .ml-xl-5,\n.mx-xl-5 {\n    margin-left: 3rem !important;\n  }\n\n  .p-xl-0 {\n    padding: 0 !important;\n  }\n\n  .pt-xl-0,\n.py-xl-0 {\n    padding-top: 0 !important;\n  }\n\n  .pr-xl-0,\n.px-xl-0 {\n    padding-right: 0 !important;\n  }\n\n  .pb-xl-0,\n.py-xl-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pl-xl-0,\n.px-xl-0 {\n    padding-left: 0 !important;\n  }\n\n  .p-xl-1 {\n    padding: 0.25rem !important;\n  }\n\n  .pt-xl-1,\n.py-xl-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pr-xl-1,\n.px-xl-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pb-xl-1,\n.py-xl-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pl-xl-1,\n.px-xl-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .p-xl-2 {\n    padding: 0.5rem !important;\n  }\n\n  .pt-xl-2,\n.py-xl-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pr-xl-2,\n.px-xl-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pb-xl-2,\n.py-xl-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pl-xl-2,\n.px-xl-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .p-xl-3 {\n    padding: 1rem !important;\n  }\n\n  .pt-xl-3,\n.py-xl-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pr-xl-3,\n.px-xl-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pb-xl-3,\n.py-xl-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pl-xl-3,\n.px-xl-3 {\n    padding-left: 1rem !important;\n  }\n\n  .p-xl-4 {\n    padding: 1.5rem !important;\n  }\n\n  .pt-xl-4,\n.py-xl-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pr-xl-4,\n.px-xl-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pb-xl-4,\n.py-xl-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pl-xl-4,\n.px-xl-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .p-xl-5 {\n    padding: 3rem !important;\n  }\n\n  .pt-xl-5,\n.py-xl-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pr-xl-5,\n.px-xl-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-xl-5,\n.py-xl-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .pl-xl-5,\n.px-xl-5 {\n    padding-left: 3rem !important;\n  }\n\n  .m-xl-n1 {\n    margin: -0.25rem !important;\n  }\n\n  .mt-xl-n1,\n.my-xl-n1 {\n    margin-top: -0.25rem !important;\n  }\n\n  .mr-xl-n1,\n.mx-xl-n1 {\n    margin-right: -0.25rem !important;\n  }\n\n  .mb-xl-n1,\n.my-xl-n1 {\n    margin-bottom: -0.25rem !important;\n  }\n\n  .ml-xl-n1,\n.mx-xl-n1 {\n    margin-left: -0.25rem !important;\n  }\n\n  .m-xl-n2 {\n    margin: -0.5rem !important;\n  }\n\n  .mt-xl-n2,\n.my-xl-n2 {\n    margin-top: -0.5rem !important;\n  }\n\n  .mr-xl-n2,\n.mx-xl-n2 {\n    margin-right: -0.5rem !important;\n  }\n\n  .mb-xl-n2,\n.my-xl-n2 {\n    margin-bottom: -0.5rem !important;\n  }\n\n  .ml-xl-n2,\n.mx-xl-n2 {\n    margin-left: -0.5rem !important;\n  }\n\n  .m-xl-n3 {\n    margin: -1rem !important;\n  }\n\n  .mt-xl-n3,\n.my-xl-n3 {\n    margin-top: -1rem !important;\n  }\n\n  .mr-xl-n3,\n.mx-xl-n3 {\n    margin-right: -1rem !important;\n  }\n\n  .mb-xl-n3,\n.my-xl-n3 {\n    margin-bottom: -1rem !important;\n  }\n\n  .ml-xl-n3,\n.mx-xl-n3 {\n    margin-left: -1rem !important;\n  }\n\n  .m-xl-n4 {\n    margin: -1.5rem !important;\n  }\n\n  .mt-xl-n4,\n.my-xl-n4 {\n    margin-top: -1.5rem !important;\n  }\n\n  .mr-xl-n4,\n.mx-xl-n4 {\n    margin-right: -1.5rem !important;\n  }\n\n  .mb-xl-n4,\n.my-xl-n4 {\n    margin-bottom: -1.5rem !important;\n  }\n\n  .ml-xl-n4,\n.mx-xl-n4 {\n    margin-left: -1.5rem !important;\n  }\n\n  .m-xl-n5 {\n    margin: -3rem !important;\n  }\n\n  .mt-xl-n5,\n.my-xl-n5 {\n    margin-top: -3rem !important;\n  }\n\n  .mr-xl-n5,\n.mx-xl-n5 {\n    margin-right: -3rem !important;\n  }\n\n  .mb-xl-n5,\n.my-xl-n5 {\n    margin-bottom: -3rem !important;\n  }\n\n  .ml-xl-n5,\n.mx-xl-n5 {\n    margin-left: -3rem !important;\n  }\n\n  .m-xl-auto {\n    margin: auto !important;\n  }\n\n  .mt-xl-auto,\n.my-xl-auto {\n    margin-top: auto !important;\n  }\n\n  .mr-xl-auto,\n.mx-xl-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-xl-auto,\n.my-xl-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ml-xl-auto,\n.mx-xl-auto {\n    margin-left: auto !important;\n  }\n}\n.text-monospace {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace !important;\n}\n\n.text-justify {\n  text-align: justify !important;\n}\n\n.text-wrap {\n  white-space: normal !important;\n}\n\n.text-nowrap {\n  white-space: nowrap !important;\n}\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.text-left {\n  text-align: left !important;\n}\n\n.text-right {\n  text-align: right !important;\n}\n\n.text-center {\n  text-align: center !important;\n}\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important;\n  }\n\n  .text-sm-right {\n    text-align: right !important;\n  }\n\n  .text-sm-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important;\n  }\n\n  .text-md-right {\n    text-align: right !important;\n  }\n\n  .text-md-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important;\n  }\n\n  .text-lg-right {\n    text-align: right !important;\n  }\n\n  .text-lg-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important;\n  }\n\n  .text-xl-right {\n    text-align: right !important;\n  }\n\n  .text-xl-center {\n    text-align: center !important;\n  }\n}\n.text-lowercase {\n  text-transform: lowercase !important;\n}\n\n.text-uppercase {\n  text-transform: uppercase !important;\n}\n\n.text-capitalize {\n  text-transform: capitalize !important;\n}\n\n.font-weight-light {\n  font-weight: 300 !important;\n}\n\n.font-weight-lighter {\n  font-weight: lighter !important;\n}\n\n.font-weight-normal {\n  font-weight: 400 !important;\n}\n\n.font-weight-bold {\n  font-weight: 700 !important;\n}\n\n.font-weight-bolder {\n  font-weight: bolder !important;\n}\n\n.font-italic {\n  font-style: italic !important;\n}\n\n.text-white {\n  color: #fff !important;\n}\n\n.text-primary {\n  color: #2FA4E7 !important;\n}\n\na.text-primary:hover, a.text-primary:focus {\n  color: #157ab5 !important;\n}\n\n.text-secondary {\n  color: #e9ecef !important;\n}\n\na.text-secondary:hover, a.text-secondary:focus {\n  color: #bdc6cf !important;\n}\n\n.text-success {\n  color: #73A839 !important;\n}\n\na.text-success:hover, a.text-success:focus {\n  color: #4c6f26 !important;\n}\n\n.text-info {\n  color: #033C73 !important;\n}\n\na.text-info:hover, a.text-info:focus {\n  color: #011528 !important;\n}\n\n.text-warning {\n  color: #DD5600 !important;\n}\n\na.text-warning:hover, a.text-warning:focus {\n  color: #913800 !important;\n}\n\n.text-danger {\n  color: #C71C22 !important;\n}\n\na.text-danger:hover, a.text-danger:focus {\n  color: #841317 !important;\n}\n\n.text-light {\n  color: #f8f9fa !important;\n}\n\na.text-light:hover, a.text-light:focus {\n  color: #cbd3da !important;\n}\n\n.text-dark {\n  color: #343a40 !important;\n}\n\na.text-dark:hover, a.text-dark:focus {\n  color: #121416 !important;\n}\n\n.text-body {\n  color: #495057 !important;\n}\n\n.text-muted {\n  color: #868e96 !important;\n}\n\n.text-black-50 {\n  color: rgba(0, 0, 0, 0.5) !important;\n}\n\n.text-white-50 {\n  color: rgba(255, 255, 255, 0.5) !important;\n}\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n\n.text-decoration-none {\n  text-decoration: none !important;\n}\n\n.text-break {\n  word-break: break-word !important;\n  overflow-wrap: break-word !important;\n}\n\n.text-reset {\n  color: inherit !important;\n}\n\n.visible {\n  visibility: visible !important;\n}\n\n.invisible {\n  visibility: hidden !important;\n}\n\n@media print {\n  *,\n*::before,\n*::after {\n    text-shadow: none !important;\n    box-shadow: none !important;\n  }\n\n  a:not(.btn) {\n    text-decoration: underline;\n  }\n\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  pre {\n    white-space: pre-wrap !important;\n  }\n\n  pre,\nblockquote {\n    border: 1px solid #adb5bd;\n    page-break-inside: avoid;\n  }\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\nimg {\n    page-break-inside: avoid;\n  }\n\n  p,\nh2,\nh3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\nh3 {\n    page-break-after: avoid;\n  }\n\n  @page {\n    size: a3;\n  }\n  body {\n    min-width: 992px !important;\n  }\n\n  .container {\n    min-width: 992px !important;\n  }\n\n  .navbar {\n    display: none;\n  }\n\n  .badge {\n    border: 1px solid #000;\n  }\n\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table td,\n.table th {\n    background-color: #fff !important;\n  }\n\n  .table-bordered th,\n.table-bordered td {\n    border: 1px solid #dee2e6 !important;\n  }\n\n  .table-dark {\n    color: inherit;\n  }\n  .table-dark th,\n.table-dark td,\n.table-dark thead th,\n.table-dark tbody + tbody {\n    border-color: #dee2e6;\n  }\n\n  .table .thead-dark th {\n    color: inherit;\n    border-color: #dee2e6;\n  }\n}\n.bg-primary {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#54b4eb), color-stop(60%, #2FA4E7), to(#1d9ce5));\n  background-image: linear-gradient(#54b4eb, #2FA4E7 60%, #1d9ce5);\n  background-repeat: no-repeat;\n}\n\n.bg-dark {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#04519b), color-stop(60%, #033C73), to(#02325f));\n  background-image: linear-gradient(#04519b, #033C73 60%, #02325f);\n  background-repeat: no-repeat;\n}\n\n.bg-light {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(white), color-stop(60%, #e9ecef), to(#e3e7eb));\n  background-image: linear-gradient(white, #e9ecef 60%, #e3e7eb);\n  background-repeat: no-repeat;\n}\n\n.navbar-brand,\n.nav-link {\n  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);\n}\n\n.btn {\n  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);\n}\n\n.btn-primary {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#54b4eb), color-stop(60%, #2FA4E7), to(#1d9ce5));\n  background-image: linear-gradient(#54b4eb, #2FA4E7 60%, #1d9ce5);\n  background-repeat: no-repeat;\n}\n\n.btn-secondary {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(white), color-stop(60%, #e9ecef), to(#dde2e6));\n  background-image: linear-gradient(white, #e9ecef 60%, #dde2e6);\n  background-repeat: no-repeat;\n  color: #495057;\n}\n\n.btn-success {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#88c149), color-stop(60%, #73A839), to(#699934));\n  background-image: linear-gradient(#88c149, #73A839 60%, #699934);\n  background-repeat: no-repeat;\n}\n\n.btn-info {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#04519b), color-stop(60%, #033C73), to(#02325f));\n  background-image: linear-gradient(#04519b, #033C73 60%, #02325f);\n  background-repeat: no-repeat;\n}\n\n.btn-warning {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ff6707), color-stop(60%, #DD5600), to(#c94e00));\n  background-image: linear-gradient(#ff6707, #DD5600 60%, #c94e00);\n  background-repeat: no-repeat;\n}\n\n.btn-danger {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#e12b31), color-stop(60%, #C71C22), to(#b5191f));\n  background-image: linear-gradient(#e12b31, #C71C22 60%, #b5191f);\n  background-repeat: no-repeat;\n}\n\n.btn-light {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(white), color-stop(60%, #f8f9fa), to(#eceff2));\n  background-image: linear-gradient(white, #f8f9fa 60%, #eceff2);\n  background-repeat: no-repeat;\n}\n\n.btn-dark {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#464e57), color-stop(60%, #343a40), to(#2b3035));\n  background-image: linear-gradient(#464e57, #343a40 60%, #2b3035);\n  background-repeat: no-repeat;\n}\n\n.text-secondary {\n  color: #adb5bd !important;\n}\n\n.bg-primary h1, .bg-primary h2, .bg-primary h3, .bg-primary h4, .bg-primary h5, .bg-primary h6,\n.bg-success h1,\n.bg-success h2,\n.bg-success h3,\n.bg-success h4,\n.bg-success h5,\n.bg-success h6,\n.bg-info h1,\n.bg-info h2,\n.bg-info h3,\n.bg-info h4,\n.bg-info h5,\n.bg-info h6,\n.bg-warning h1,\n.bg-warning h2,\n.bg-warning h3,\n.bg-warning h4,\n.bg-warning h5,\n.bg-warning h6,\n.bg-danger h1,\n.bg-danger h2,\n.bg-danger h3,\n.bg-danger h4,\n.bg-danger h5,\n.bg-danger h6,\n.bg-dark h1,\n.bg-dark h2,\n.bg-dark h3,\n.bg-dark h4,\n.bg-dark h5,\n.bg-dark h6 {\n  color: #fff;\n}\n\n.dropdown-menu .dropdown-header {\n  color: #868e96;\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #533f03;\n  font-weight: bold;\n}\n\n* {\n  box-sizing: border-box;\n}\n*:after, *::before {\n  box-sizing: border-box;\n}\n\n.app-container {\n  box-sizing: border-box;\n}\n.app-container .view-container {\n  width: 100%;\n  height: calc(100% - 40px);\n  overflow-y: auto;\n  overflow-x: hidden;\n  padding: 1rem;\n}\n.app-container .view-container .card {\n  padding: 1rem;\n}\n.app-container .view-container .view-routes {\n  height: 100%;\n}\n.app-container .view-container .view-routes > div {\n  height: 100%;\n}\n\n.fullscreen {\n  position: fixed;\n  top: 100px;\n  left: 0px;\n  width: 99% !important;\n  height: calc(100vh - 110px) !important;\n  margin: 5px;\n  z-index: 1000;\n  padding: 5px 25px 50px 25px !important;\n}\n\n/* ==========================================================================\nBrowser Upgrade Prompt\n========================================================================== */\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/* ==========================================================================\nCustom button styles\n========================================================================== */\n.icon-button > .btn {\n  background-color: transparent;\n  border-color: transparent;\n  padding: 0.5rem;\n  line-height: 1rem;\n}\n.icon-button > .btn:hover {\n  background-color: transparent;\n  border-color: transparent;\n}\n.icon-button > .btn:focus {\n  box-shadow: none;\n}\n\n/* ==========================================================================\nGeneric styles\n========================================================================== */\n/* Temporary workaround for availity-reactstrap-validation */\n.invalid-feedback {\n  display: inline;\n}\n\n/* other generic styles */\n.title {\n  font-size: 1.25em;\n  margin: 1px 10px 1px 10px;\n}\n\n.description {\n  font-size: 0.9em;\n  margin: 1px 10px 1px 10px;\n}\n\n.shadow {\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;\n  border-radius: 2px;\n}\n\n.error {\n  color: white;\n  background-color: red;\n}\n\n.break {\n  white-space: normal;\n  word-break: break-all;\n}\n\n.break-word {\n  white-space: normal;\n  word-break: keep-all;\n}\n\n.preserve-space {\n  white-space: pre-wrap;\n}\n\n/* padding helpers */\n.pad {\n  padding: 10px !important;\n}\n\n.pad-2 {\n  padding: 2px !important;\n}\n\n.pad-3 {\n  padding: 3px !important;\n}\n\n.pad-5 {\n  padding: 5px !important;\n}\n\n.pad-10 {\n  padding: 10px !important;\n}\n\n.pad-20 {\n  padding: 20px !important;\n}\n\n.pad-25 {\n  padding: 25px !important;\n}\n\n.pad-30 {\n  padding: 30px !important;\n}\n\n.pad-50 {\n  padding: 50px !important;\n}\n\n.pad-75 {\n  padding: 75px !important;\n}\n\n.pad-100 {\n  padding: 100px !important;\n}\n\n.pad-top-4 {\n  padding-top: 4px !important;\n}\n\n.pad-top-5 {\n  padding-top: 5px !important;\n}\n\n.pad-top-10 {\n  padding-top: 10px !important;\n}\n\n.pad-top-20 {\n  padding-top: 20px !important;\n}\n\n.pad-top-25 {\n  padding-top: 25px !important;\n}\n\n.pad-top-30 {\n  padding-top: 30px !important;\n}\n\n.pad-top-50 {\n  padding-top: 50px !important;\n}\n\n.pad-top-75 {\n  padding-top: 75px !important;\n}\n\n.pad-top-100 {\n  padding-top: 100px !important;\n}\n\n.pad-bottom-4 {\n  padding-bottom: 4px !important;\n}\n\n.pad-bottom-5 {\n  padding-bottom: 5px !important;\n}\n\n.pad-bottom-10 {\n  padding-bottom: 10px !important;\n}\n\n.pad-bottom-20 {\n  padding-bottom: 20px !important;\n}\n\n.pad-bottom-25 {\n  padding-bottom: 25px !important;\n}\n\n.pad-bottom-30 {\n  padding-bottom: 30px !important;\n}\n\n.pad-bottom-50 {\n  padding-bottom: 50px !important;\n}\n\n.pad-bottom-75 {\n  padding-bottom: 75px !important;\n}\n\n.pad-bottom-100 {\n  padding-bottom: 100px !important;\n}\n\n.pad-right-5 {\n  padding-right: 5px !important;\n}\n\n.pad-right-10 {\n  padding-right: 10px !important;\n}\n\n.pad-right-20 {\n  padding-right: 20px !important;\n}\n\n.pad-right-25 {\n  padding-right: 25px !important;\n}\n\n.pad-right-30 {\n  padding-right: 30px !important;\n}\n\n.pad-right-50 {\n  padding-right: 50px !important;\n}\n\n.pad-right-75 {\n  padding-right: 75px !important;\n}\n\n.pad-right-100 {\n  padding-right: 100px !important;\n}\n\n.pad-left-5 {\n  padding-left: 5px !important;\n}\n\n.pad-left-10 {\n  padding-left: 10px !important;\n}\n\n.pad-left-20 {\n  padding-left: 20px !important;\n}\n\n.pad-left-25 {\n  padding-left: 25px !important;\n}\n\n.pad-left-30 {\n  padding-left: 30px !important;\n}\n\n.pad-left-50 {\n  padding-left: 50px !important;\n}\n\n.pad-left-75 {\n  padding-left: 75px !important;\n}\n\n.pad-left-100 {\n  padding-left: 100px !important;\n}\n\n.no-padding-left {\n  padding-left: 0 !important;\n}\n\n.no-padding-right {\n  padding-right: 0 !important;\n}\n\n.no-padding-top {\n  padding-top: 0 !important;\n}\n\n.no-padding-bottom {\n  padding-bottom: 0 !important;\n}\n\n.no-padding {\n  padding: 0 !important;\n}\n\n/* end of padding helpers */\n.no-margin {\n  margin: 0px;\n}\n\n.voffset {\n  margin-top: 2px !important;\n}\n\n.voffset-5 {\n  margin-top: 5px !important;\n}\n\n.voffset-10 {\n  margin-top: 10px !important;\n}\n\n.voffset-15 {\n  margin-top: 15px !important;\n}\n\n.voffset-30 {\n  margin-top: 30px !important;\n}\n\n.voffset-40 {\n  margin-top: 40px !important;\n}\n\n.voffset-60 {\n  margin-top: 60px !important;\n}\n\n.voffset-80 {\n  margin-top: 80px !important;\n}\n\n.voffset-100 {\n  margin-top: 100px !important;\n}\n\n.voffset-150 {\n  margin-top: 150px !important;\n}\n\n.readonly {\n  background-color: #eee;\n  opacity: 1;\n}\n\n/* ==========================================================================\nmake sure browsers use the pointer cursor for anchors, even with no href\n========================================================================== */\na:hover {\n  cursor: pointer;\n}\n\n.hand {\n  cursor: pointer;\n}\n\nbutton.anchor-btn {\n  background: none;\n  border: none;\n  padding: 0;\n  -webkit-box-align: initial;\n          align-items: initial;\n  text-align: initial;\n  width: 100%;\n}\n\na.anchor-btn:hover {\n  text-decoration: none;\n}\n\n/* ==========================================================================\nMetrics and Health styles\n========================================================================== */\n#threadDump .popover,\n#healthCheck .popover {\n  top: inherit;\n  display: block;\n  font-size: 10px;\n  max-width: 1024px;\n}\n\n.thread-dump-modal-lock {\n  max-width: 450px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#healthCheck .popover {\n  margin-left: -50px;\n}\n\n.health-details {\n  min-width: 400px;\n}\n\n/* bootstrap 3 input-group 100% width\nhttp://stackoverflow.com/questions/23436430/bootstrap-3-input-group-100-width */\n.width-min {\n  width: 1% !important;\n}\n\n.form-check-input {\n  margin-top: -0.5rem;\n}\n\n/* jhipster-needle-scss-add-main JHipster will add new css style */", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/modules/home/home.scss":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js??ref--8-3!./src/main/webapp/app/modules/home/home.scss ***!
  \*******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../../../content/images/jhipster_family_member_0.svg */ "./src/main/webapp/content/images/jhipster_family_member_0.svg"));

// Module
exports.push([module.i, "/* ==========================================================================\nMain page styles\n========================================================================== */\n.hipster {\n  display: inline-block;\n  width: 100%;\n  height: 497px;\n  background: url(" + ___CSS_LOADER_URL___0___ + ") no-repeat center top;\n  background-size: contain;\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/footer/footer.scss":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js??ref--8-3!./src/main/webapp/app/shared/layout/footer/footer.scss ***!
  \*****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".footer {\n  height: 50px;\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/header/header.scss":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js??ref--8-3!./src/main/webapp/app/shared/layout/header/header.scss ***!
  \*****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/* ==========================================================================\nDevelopement Ribbon\n========================================================================== */\n.ribbon {\n  background-color: rgba(170, 0, 0, 0.5);\n  left: -3.5em;\n  -webkit-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n  overflow: hidden;\n  position: absolute;\n  top: 30px;\n  white-space: nowrap;\n  width: 15em;\n  z-index: 99999;\n  pointer-events: none;\n  opacity: 0.75;\n}\n.ribbon a {\n  color: #fff;\n  display: block;\n  font-weight: 400;\n  margin: 1px 0;\n  padding: 10px 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 0 5px #444;\n  pointer-events: none;\n}\n\n/* ==========================================================================\nNavbar styles\n========================================================================== */\n.navbar-version {\n  font-size: 10px;\n  color: #bbb;\n  padding: 0 0 0 10px;\n}\n\n.brand-logo:hover {\n  text-decoration: none;\n}\n.brand-logo .brand-icon {\n  height: 35px;\n  width: auto;\n  display: inline-block;\n}\n.brand-logo .brand-icon img {\n  height: 45px;\n}\n\n.brand-title {\n  font-size: 24px;\n  color: #fff;\n}\n.brand-title:hover {\n  color: #cccccc;\n  text-decoration: none;\n}\n\n.loading-bar {\n  height: 3px;\n  background-color: #009cd8;\n  position: absolute;\n  top: 0px;\n  z-index: 1031;\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/password/password-strength-bar.scss":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js??ref--8-3!./src/main/webapp/app/shared/layout/password/password-strength-bar.scss ***!
  \**********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/* ==========================================================================\nstart Password strength bar style\n========================================================================== */\nul#strength {\n  display: inline;\n  list-style: none;\n  margin: 0;\n  margin-left: 15px;\n  padding: 0;\n  vertical-align: 2px;\n}\n\n.point {\n  background: #ddd;\n  border-radius: 2px;\n  display: inline-block;\n  height: 5px;\n  margin-right: 1px;\n  width: 20px;\n}\n.point:last-child {\n  margin: 0 !important;\n}", ""]);



/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/main/webapp/app/app.scss":
/*!**************************************!*\
  !*** ./src/main/webapp/app/app.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src!../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./app.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src!../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./app.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/app.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src!../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./app.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/app.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/app.tsx":
/*!*************************************!*\
  !*** ./src/main/webapp/app/app.tsx ***!
  \*************************************/
/*! exports provided: App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ "./node_modules/react-toastify/dist/ReactToastify.css");
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.scss */ "./src/main/webapp/app/app.scss");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var app_shared_reducers_application_profile__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/shared/reducers/application-profile */ "./src/main/webapp/app/shared/reducers/application-profile.ts");
/* harmony import */ var app_shared_layout_header_header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/shared/layout/header/header */ "./src/main/webapp/app/shared/layout/header/header.tsx");
/* harmony import */ var app_shared_layout_footer_footer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/shared/layout/footer/footer */ "./src/main/webapp/app/shared/layout/footer/footer.tsx");
/* harmony import */ var app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/shared/auth/private-route */ "./src/main/webapp/app/shared/auth/private-route.tsx");
/* harmony import */ var app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/shared/error/error-boundary */ "./src/main/webapp/app/shared/error/error-boundary.tsx");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");
/* harmony import */ var app_routes__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/routes */ "./src/main/webapp/app/routes.tsx");
















const baseHref = document
    .querySelector('base')
    .getAttribute('href')
    .replace(/\/$/, '');
const App = (props) => {
    Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
        props.getSession();
        props.getProfile();
    }, []);
    const paddingTop = '60px';
    return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["BrowserRouter"], { basename: baseHref },
        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "app-container", style: { paddingTop } },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_6__["ToastContainer"], { position: react_toastify__WEBPACK_IMPORTED_MODULE_6__["toast"].POSITION.TOP_LEFT, className: "toastify-container", toastClassName: "toastify-toast" }),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_13__["default"], null,
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_shared_layout_header_header__WEBPACK_IMPORTED_MODULE_10__["default"], { isAuthenticated: props.isAuthenticated, isAdmin: props.isAdmin, ribbonEnv: props.ribbonEnv, isInProduction: props.isInProduction, isSwaggerEnabled: props.isSwaggerEnabled })),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "container-fluid view-container", id: "app-view-container" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Card"], { className: "jh-card" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_13__["default"], null,
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_routes__WEBPACK_IMPORTED_MODULE_15__["default"], null))),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_shared_layout_footer_footer__WEBPACK_IMPORTED_MODULE_11__["default"], null)))));
};
const mapStateToProps = ({ authentication, applicationProfile }) => ({
    isAuthenticated: authentication.isAuthenticated,
    isAdmin: Object(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_12__["hasAnyAuthority"])(authentication.account.authorities, [app_config_constants__WEBPACK_IMPORTED_MODULE_14__["AUTHORITIES"].ADMIN]),
    ribbonEnv: applicationProfile.ribbonEnv,
    isInProduction: applicationProfile.inProduction,
    isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});
const mapDispatchToProps = { getSession: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_8__["getSession"], getProfile: app_shared_reducers_application_profile__WEBPACK_IMPORTED_MODULE_9__["getProfile"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__["hot"])(module)(App)));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/app.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/app.tsx"); } })(); 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/main/webapp/app/config/axios-interceptor.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/config/axios-interceptor.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");



const TIMEOUT = 1 * 60 * 1000;
axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.timeout = TIMEOUT;
axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.baseURL = app_config_constants__WEBPACK_IMPORTED_MODULE_2__["SERVER_API_URL"];
const setupAxiosInterceptors = onUnauthenticated => {
    const onRequestSuccess = config => {
        const token = react_jhipster__WEBPACK_IMPORTED_MODULE_1__["Storage"].local.get('jhi-authenticationToken') || react_jhipster__WEBPACK_IMPORTED_MODULE_1__["Storage"].session.get('jhi-authenticationToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    };
    const onResponseSuccess = response => response;
    const onResponseError = err => {
        const status = err.status || (err.response ? err.response.status : 0);
        if (status === 403 || status === 401) {
            onUnauthenticated();
        }
        return Promise.reject(err);
    };
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.interceptors.request.use(onRequestSuccess);
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.interceptors.response.use(onResponseSuccess, onResponseError);
};
/* harmony default export */ __webpack_exports__["default"] = (setupAxiosInterceptors);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/config/axios-interceptor.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/config/axios-interceptor.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/config/constants.ts":
/*!*************************************************!*\
  !*** ./src/main/webapp/app/config/constants.ts ***!
  \*************************************************/
/*! exports provided: default, SERVER_API_URL, AUTHORITIES, messages, APP_DATE_FORMAT, APP_TIMESTAMP_FORMAT, APP_LOCAL_DATE_FORMAT, APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z, APP_WHOLE_NUMBER_FORMAT, APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVER_API_URL", function() { return SERVER_API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTHORITIES", function() { return AUTHORITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messages", function() { return messages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_DATE_FORMAT", function() { return APP_DATE_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_TIMESTAMP_FORMAT", function() { return APP_TIMESTAMP_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_LOCAL_DATE_FORMAT", function() { return APP_LOCAL_DATE_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_LOCAL_DATETIME_FORMAT", function() { return APP_LOCAL_DATETIME_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_LOCAL_DATETIME_FORMAT_Z", function() { return APP_LOCAL_DATETIME_FORMAT_Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_WHOLE_NUMBER_FORMAT", function() { return APP_WHOLE_NUMBER_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT", function() { return APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT; });
const config = {
    VERSION: 'DEV'
};
/* harmony default export */ __webpack_exports__["default"] = (config);
const SERVER_API_URL = '';
const AUTHORITIES = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
};
const messages = {
    DATA_ERROR_ALERT: 'Internal Error'
};
const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
const APP_WHOLE_NUMBER_FORMAT = '0,0';
const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/config/constants.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/config/constants.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/config/devtools.tsx":
/*!*************************************************!*\
  !*** ./src/main/webapp/app/config/devtools.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_devtools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-devtools */ "./node_modules/redux-devtools/lib/index.js");
/* harmony import */ var redux_devtools__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_devtools__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-devtools-log-monitor */ "./node_modules/redux-devtools-log-monitor/lib/index.js");
/* harmony import */ var redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-devtools-dock-monitor */ "./node_modules/redux-devtools-dock-monitor/lib/index.js");
/* harmony import */ var redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3__);




// You can toggle visibility of devTools with ctrl + H
// and change their position with ctrl + Q
/* harmony default export */ __webpack_exports__["default"] = (Object(redux_devtools__WEBPACK_IMPORTED_MODULE_1__["createDevTools"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_devtools_dock_monitor__WEBPACK_IMPORTED_MODULE_3___default.a, { toggleVisibilityKey: "ctrl-h", changePositionKey: "ctrl-q", defaultIsVisible: false },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(redux_devtools_log_monitor__WEBPACK_IMPORTED_MODULE_2___default.a, null))));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/config/devtools.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/config/devtools.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/config/error-middleware.ts":
/*!********************************************************!*\
  !*** ./src/main/webapp/app/config/error-middleware.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_0__);

const getErrorMessage = errorData => {
    let message = errorData.message;
    if (errorData.fieldErrors) {
        errorData.fieldErrors.forEach(fErr => {
            message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
        });
    }
    return message;
};
/* harmony default export */ __webpack_exports__["default"] = (() => next => action => {
    // If not a promise, continue on
    if (!Object(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["isPromise"])(action.payload)) {
        return next(action);
    }
    /**
     *
     * The error middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `catch`.
     * It need not run in production
     */
    if (true) {
        // Dispatch initial pending promise, but catch any errors
        return next(action).catch(error => {
            console.error(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
            if (error && error.response && error.response.data) {
                const message = getErrorMessage(error.response.data);
                console.error(`Actual cause: ${message}`);
            }
            return Promise.reject(error);
        });
    }
    return next(action);
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/config/error-middleware.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/config/error-middleware.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/config/icon-loader.ts":
/*!***************************************************!*\
  !*** ./src/main/webapp/app/config/icon-loader.ts ***!
  \***************************************************/
/*! exports provided: loadIcons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadIcons", function() { return loadIcons; });
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSort */ "./node_modules/@fortawesome/free-solid-svg-icons/faSort.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSort__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSort__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faEye__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faEye */ "./node_modules/@fortawesome/free-solid-svg-icons/faEye.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faEye__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faEye__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSync__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSync */ "./node_modules/@fortawesome/free-solid-svg-icons/faSync.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSync__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSync__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faBan */ "./node_modules/@fortawesome/free-solid-svg-icons/faBan.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBan__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faBan__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTrash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faTrash */ "./node_modules/@fortawesome/free-solid-svg-icons/faTrash.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTrash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faTrash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faArrowLeft__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faArrowLeft */ "./node_modules/@fortawesome/free-solid-svg-icons/faArrowLeft.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faArrowLeft__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faArrowLeft__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSave__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSave */ "./node_modules/@fortawesome/free-solid-svg-icons/faSave.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSave__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSave__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faPlus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faPlus */ "./node_modules/@fortawesome/free-solid-svg-icons/faPlus.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faPlus__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faPlus__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faPencilAlt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faPencilAlt */ "./node_modules/@fortawesome/free-solid-svg-icons/faPencilAlt.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faPencilAlt__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faPencilAlt__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faUser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faUser */ "./node_modules/@fortawesome/free-solid-svg-icons/faUser.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faUser__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faUser__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHdd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faHdd */ "./node_modules/@fortawesome/free-solid-svg-icons/faHdd.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHdd__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faHdd__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTachometerAlt__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faTachometerAlt */ "./node_modules/@fortawesome/free-solid-svg-icons/faTachometerAlt.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTachometerAlt__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faTachometerAlt__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHeart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faHeart */ "./node_modules/@fortawesome/free-solid-svg-icons/faHeart.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHeart__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faHeart__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faList */ "./node_modules/@fortawesome/free-solid-svg-icons/faList.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faList__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faList__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTasks__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faTasks */ "./node_modules/@fortawesome/free-solid-svg-icons/faTasks.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTasks__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faTasks__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBook__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faBook */ "./node_modules/@fortawesome/free-solid-svg-icons/faBook.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBook__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faBook__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faLock__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faLock */ "./node_modules/@fortawesome/free-solid-svg-icons/faLock.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faLock__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faLock__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSignInAlt__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSignInAlt */ "./node_modules/@fortawesome/free-solid-svg-icons/faSignInAlt.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSignInAlt__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSignInAlt__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSignOutAlt__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSignOutAlt */ "./node_modules/@fortawesome/free-solid-svg-icons/faSignOutAlt.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSignOutAlt__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSignOutAlt__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faThList__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faThList */ "./node_modules/@fortawesome/free-solid-svg-icons/faThList.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faThList__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faThList__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faUserPlus__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faUserPlus */ "./node_modules/@fortawesome/free-solid-svg-icons/faUserPlus.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faUserPlus__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faUserPlus__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faWrench__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faWrench */ "./node_modules/@fortawesome/free-solid-svg-icons/faWrench.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faWrench__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faWrench__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faAsterisk__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faAsterisk */ "./node_modules/@fortawesome/free-solid-svg-icons/faAsterisk.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faAsterisk__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faAsterisk__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faFlag__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faFlag */ "./node_modules/@fortawesome/free-solid-svg-icons/faFlag.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faFlag__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faFlag__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBell__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faBell */ "./node_modules/@fortawesome/free-solid-svg-icons/faBell.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faBell__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faBell__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHome__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faHome */ "./node_modules/@fortawesome/free-solid-svg-icons/faHome.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faHome__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faHome__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTimesCircle__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faTimesCircle */ "./node_modules/@fortawesome/free-solid-svg-icons/faTimesCircle.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faTimesCircle__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faTimesCircle__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSearch__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faSearch */ "./node_modules/@fortawesome/free-solid-svg-icons/faSearch.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faSearch__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faSearch__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faRoad__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faRoad */ "./node_modules/@fortawesome/free-solid-svg-icons/faRoad.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faRoad__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faRoad__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _fortawesome_free_solid_svg_icons_faCloud__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons/faCloud */ "./node_modules/@fortawesome/free-solid-svg-icons/faCloud.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons_faCloud__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons_faCloud__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");































const loadIcons = () => {
    _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_30__["library"].add(_fortawesome_free_solid_svg_icons_faSort__WEBPACK_IMPORTED_MODULE_0__["faSort"], _fortawesome_free_solid_svg_icons_faEye__WEBPACK_IMPORTED_MODULE_1__["faEye"], _fortawesome_free_solid_svg_icons_faSync__WEBPACK_IMPORTED_MODULE_2__["faSync"], _fortawesome_free_solid_svg_icons_faBan__WEBPACK_IMPORTED_MODULE_3__["faBan"], _fortawesome_free_solid_svg_icons_faTrash__WEBPACK_IMPORTED_MODULE_4__["faTrash"], _fortawesome_free_solid_svg_icons_faArrowLeft__WEBPACK_IMPORTED_MODULE_5__["faArrowLeft"], _fortawesome_free_solid_svg_icons_faSave__WEBPACK_IMPORTED_MODULE_6__["faSave"], _fortawesome_free_solid_svg_icons_faPlus__WEBPACK_IMPORTED_MODULE_7__["faPlus"], _fortawesome_free_solid_svg_icons_faPencilAlt__WEBPACK_IMPORTED_MODULE_8__["faPencilAlt"], _fortawesome_free_solid_svg_icons_faUser__WEBPACK_IMPORTED_MODULE_9__["faUser"], _fortawesome_free_solid_svg_icons_faTachometerAlt__WEBPACK_IMPORTED_MODULE_11__["faTachometerAlt"], _fortawesome_free_solid_svg_icons_faHeart__WEBPACK_IMPORTED_MODULE_12__["faHeart"], _fortawesome_free_solid_svg_icons_faList__WEBPACK_IMPORTED_MODULE_13__["faList"], _fortawesome_free_solid_svg_icons_faTasks__WEBPACK_IMPORTED_MODULE_14__["faTasks"], _fortawesome_free_solid_svg_icons_faBook__WEBPACK_IMPORTED_MODULE_15__["faBook"], _fortawesome_free_solid_svg_icons_faHdd__WEBPACK_IMPORTED_MODULE_10__["faHdd"], _fortawesome_free_solid_svg_icons_faLock__WEBPACK_IMPORTED_MODULE_16__["faLock"], _fortawesome_free_solid_svg_icons_faSignInAlt__WEBPACK_IMPORTED_MODULE_17__["faSignInAlt"], _fortawesome_free_solid_svg_icons_faSignOutAlt__WEBPACK_IMPORTED_MODULE_18__["faSignOutAlt"], _fortawesome_free_solid_svg_icons_faWrench__WEBPACK_IMPORTED_MODULE_21__["faWrench"], _fortawesome_free_solid_svg_icons_faThList__WEBPACK_IMPORTED_MODULE_19__["faThList"], _fortawesome_free_solid_svg_icons_faUserPlus__WEBPACK_IMPORTED_MODULE_20__["faUserPlus"], _fortawesome_free_solid_svg_icons_faAsterisk__WEBPACK_IMPORTED_MODULE_22__["faAsterisk"], _fortawesome_free_solid_svg_icons_faFlag__WEBPACK_IMPORTED_MODULE_23__["faFlag"], _fortawesome_free_solid_svg_icons_faBell__WEBPACK_IMPORTED_MODULE_24__["faBell"], _fortawesome_free_solid_svg_icons_faHome__WEBPACK_IMPORTED_MODULE_25__["faHome"], _fortawesome_free_solid_svg_icons_faRoad__WEBPACK_IMPORTED_MODULE_28__["faRoad"], _fortawesome_free_solid_svg_icons_faCloud__WEBPACK_IMPORTED_MODULE_29__["faCloud"], _fortawesome_free_solid_svg_icons_faTimesCircle__WEBPACK_IMPORTED_MODULE_26__["faTimesCircle"], _fortawesome_free_solid_svg_icons_faSearch__WEBPACK_IMPORTED_MODULE_27__["faSearch"]);
};


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/config/icon-loader.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/config/icon-loader.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/config/logger-middleware.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/config/logger-middleware.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint no-console: off */
/* harmony default export */ __webpack_exports__["default"] = (() => next => action => {
    if (true) {
        const { type, payload, meta } = action;
        console.groupCollapsed(type);
        console.log('Payload:', payload);
        console.log('Meta:', meta);
        console.groupEnd();
    }
    return next(action);
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/config/logger-middleware.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/config/logger-middleware.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/config/notification-middleware.ts":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/config/notification-middleware.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_1__);


const addErrorAlert = (message, key, data) => {
    react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error(message);
};
/* harmony default export */ __webpack_exports__["default"] = (() => next => action => {
    // If not a promise, continue on
    if (!Object(react_jhipster__WEBPACK_IMPORTED_MODULE_0__["isPromise"])(action.payload)) {
        return next(action);
    }
    /**
     *
     * The notification middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `then` and `catch.
     */
    return next(action)
        .then(response => {
        if (action.meta && action.meta.successMessage) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].success(action.meta.successMessage);
        }
        else if (response && response.action && response.action.payload && response.action.payload.headers) {
            const headers = response.action.payload.headers;
            let alert = null;
            Object.entries(headers).forEach(([k, v]) => {
                if (k.toLowerCase().endsWith('app-alert')) {
                    alert = v;
                }
            });
            if (alert) {
                react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].success(alert);
            }
        }
        return Promise.resolve(response);
    })
        .catch(error => {
        if (action.meta && action.meta.errorMessage) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error(action.meta.errorMessage);
        }
        else if (error && error.response) {
            const response = error.response;
            const data = response.data;
            if (!(response.status === 401 && (error.message === '' || (data && data.path && data.path.includes('/api/account'))))) {
                let i;
                switch (response.status) {
                    // connection refused, server not reachable
                    case 0:
                        addErrorAlert('Server not reachable', 'error.server.not.reachable');
                        break;
                    case 400: {
                        const headers = Object.entries(response.headers);
                        let errorHeader = null;
                        let entityKey = null;
                        headers.forEach(([k, v]) => {
                            if (k.toLowerCase().endsWith('app-error')) {
                                errorHeader = v;
                            }
                            else if (k.toLowerCase().endsWith('app-params')) {
                                entityKey = v;
                            }
                        });
                        if (errorHeader) {
                            const entityName = entityKey;
                            addErrorAlert(errorHeader, errorHeader, { entityName });
                        }
                        else if (data !== '' && data.fieldErrors) {
                            const fieldErrors = data.fieldErrors;
                            for (i = 0; i < fieldErrors.length; i++) {
                                const fieldError = fieldErrors[i];
                                if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                                    fieldError.message = 'Size';
                                }
                                // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                                const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                                const fieldName = convertedField.charAt(0).toUpperCase() + convertedField.slice(1);
                                addErrorAlert(`Error on field "${fieldName}"`, `error.${fieldError.message}`, { fieldName });
                            }
                        }
                        else if (data !== '' && data.message) {
                            addErrorAlert(data.message, data.message, data.params);
                        }
                        else {
                            addErrorAlert(data);
                        }
                        break;
                    }
                    case 404:
                        addErrorAlert('Not found', 'error.url.not.found');
                        break;
                    default:
                        if (data !== '' && data.message) {
                            addErrorAlert(data.message);
                        }
                        else {
                            addErrorAlert(data);
                        }
                }
            }
        }
        else if (error && error.config && error.config.url === 'api/account' && error.config.method === 'get') {
            /* eslint-disable no-console */
            console.log('Authentication Error: Trying to access url api/account with GET.');
        }
        else if (error && error.message) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error(error.message);
        }
        else {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__["toast"].error('Unknown error!');
        }
        return Promise.reject(error);
    });
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/config/notification-middleware.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/config/notification-middleware.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/config/store.ts":
/*!*********************************************!*\
  !*** ./src/main/webapp/app/config/store.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_promise_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-promise-middleware */ "./node_modules/redux-promise-middleware/dist/es/index.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var app_shared_reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers */ "./src/main/webapp/app/shared/reducers/index.ts");
/* harmony import */ var _devtools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./devtools */ "./src/main/webapp/app/config/devtools.tsx");
/* harmony import */ var _error_middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error-middleware */ "./src/main/webapp/app/config/error-middleware.ts");
/* harmony import */ var _notification_middleware__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notification-middleware */ "./src/main/webapp/app/config/notification-middleware.ts");
/* harmony import */ var _logger_middleware__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./logger-middleware */ "./src/main/webapp/app/config/logger-middleware.ts");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux-loading-bar */ "./node_modules/react-redux-loading-bar/build/index.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_8__);









const defaultMiddlewares = [
    redux_thunk__WEBPACK_IMPORTED_MODULE_2__["default"],
    _error_middleware__WEBPACK_IMPORTED_MODULE_5__["default"],
    _notification_middleware__WEBPACK_IMPORTED_MODULE_6__["default"],
    redux_promise_middleware__WEBPACK_IMPORTED_MODULE_1__["default"],
    Object(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_8__["loadingBarMiddleware"])(),
    _logger_middleware__WEBPACK_IMPORTED_MODULE_7__["default"]
];
const composedMiddlewares = middlewares =>  true
    ? Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(...defaultMiddlewares, ...middlewares), _devtools__WEBPACK_IMPORTED_MODULE_4__["default"].instrument())
    : undefined;
const initialize = (initialState, middlewares = []) => Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(app_shared_reducers__WEBPACK_IMPORTED_MODULE_3__["default"], initialState, composedMiddlewares(middlewares));
/* harmony default export */ __webpack_exports__["default"] = (initialize);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/config/store.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/config/store.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/diary/diary-delete-dialog.tsx":
/*!********************************************************************!*\
  !*** ./src/main/webapp/app/entities/diary/diary-delete-dialog.tsx ***!
  \********************************************************************/
/*! exports provided: DiaryDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiaryDeleteDialog", function() { return DiaryDeleteDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _diary_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diary.reducer */ "./src/main/webapp/app/entities/diary/diary.reducer.ts");





class DiaryDeleteDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.confirmDelete = event => {
            this.props.deleteEntity(this.props.diaryEntity.id);
            this.handleClose(event);
        };
        this.handleClose = event => {
            event.stopPropagation();
            this.props.history.goBack();
        };
    }
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }
    render() {
        const { diaryEntity } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalHeader"], { toggle: this.handleClose }, "Confirm delete operation"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalBody"], { id: "junctionApp.diary.delete.question" }, "Are you sure you want to delete this Diary?"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0 Cancel"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { id: "jhi-confirm-delete-diary", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0 Delete"))));
    }
}
const mapStateToProps = ({ diary }) => ({
    diaryEntity: diary.entity
});
const mapDispatchToProps = { getEntity: _diary_reducer__WEBPACK_IMPORTED_MODULE_4__["getEntity"], deleteEntity: _diary_reducer__WEBPACK_IMPORTED_MODULE_4__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DiaryDeleteDialog));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary-delete-dialog.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/diary/diary-detail.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/diary/diary-detail.tsx ***!
  \*************************************************************/
/*! exports provided: DiaryDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiaryDetail", function() { return DiaryDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _diary_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./diary.reducer */ "./src/main/webapp/app/entities/diary/diary.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");








class DiaryDetail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }
    render() {
        const { diaryEntity } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null,
                    "Diary [",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, diaryEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "content" }, "Content")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, diaryEntity.content),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "createdAt" }, "Created At")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["TextFormat"], { value: diaryEntity.createdAt, type: "date", format: app_config_constants__WEBPACK_IMPORTED_MODULE_7__["APP_LOCAL_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "userId" }, "User Id")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, diaryEntity.userId),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "n" }, "N")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, diaryEntity.n)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: "/diary", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Back")),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `/diary/${diaryEntity.id}/edit`, replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Edit")))));
    }
}
const mapStateToProps = ({ diary }) => ({
    diaryEntity: diary.entity
});
const mapDispatchToProps = { getEntity: _diary_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DiaryDetail));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary-detail.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/diary/diary-update.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/diary/diary-update.tsx ***!
  \*************************************************************/
/*! exports provided: DiaryUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiaryUpdate", function() { return DiaryUpdate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _diary_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./diary.reducer */ "./src/main/webapp/app/entities/diary/diary.reducer.ts");







class DiaryUpdate extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.saveEntity = (event, errors, values) => {
            if (errors.length === 0) {
                const { diaryEntity } = this.props;
                const entity = Object.assign({}, diaryEntity, values);
                if (this.state.isNew) {
                    this.props.createEntity(entity);
                }
                else {
                    this.props.updateEntity(entity);
                }
            }
        };
        this.handleClose = () => {
            this.props.history.push('/diary');
        };
        this.state = {
            isNew: !this.props.match.params || !this.props.match.params.id
        };
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    }
    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
    }
    render() {
        const { diaryEntity, loading, updating } = this.props;
        const { isNew } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "junctionApp.diary.home.createOrEditLabel" }, "Create or edit a Diary"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { model: isNew ? {} : diaryEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "diary-id" }, "ID"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { id: "diary-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { id: "contentLabel", for: "diary-content" }, "Content"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "diary-content", type: "text", name: "content" })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { id: "createdAtLabel", for: "diary-createdAt" }, "Created At"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "diary-createdAt", type: "date", className: "form-control", name: "createdAt" })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { id: "userIdLabel", for: "diary-userId" }, "User Id"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "diary-userId", type: "string", className: "form-control", name: "userId" })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { id: "nLabel", for: "diary-n" }, "N"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "diary-n", type: "text", name: "n" })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], id: "cancel-save", to: "/diary", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Back")),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0 Save")))))));
    }
}
const mapStateToProps = (storeState) => ({
    diaryEntity: storeState.diary.entity,
    loading: storeState.diary.loading,
    updating: storeState.diary.updating,
    updateSuccess: storeState.diary.updateSuccess
});
const mapDispatchToProps = {
    getEntity: _diary_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"],
    updateEntity: _diary_reducer__WEBPACK_IMPORTED_MODULE_6__["updateEntity"],
    createEntity: _diary_reducer__WEBPACK_IMPORTED_MODULE_6__["createEntity"],
    reset: _diary_reducer__WEBPACK_IMPORTED_MODULE_6__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DiaryUpdate));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary-update.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/diary/diary.reducer.ts":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/entities/diary/diary.reducer.ts ***!
  \*************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_diary_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/diary.model */ "./src/main/webapp/app/shared/model/diary.model.ts");





const ACTION_TYPES = {
    FETCH_DIARY_LIST: 'diary/FETCH_DIARY_LIST',
    FETCH_DIARY: 'diary/FETCH_DIARY',
    CREATE_DIARY: 'diary/CREATE_DIARY',
    UPDATE_DIARY: 'diary/UPDATE_DIARY',
    DELETE_DIARY: 'diary/DELETE_DIARY',
    RESET: 'diary/RESET'
};
const initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_diary_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_DIARY_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_DIARY):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_DIARY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_DIARY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_DIARY):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_DIARY_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_DIARY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_DIARY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_DIARY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_DIARY):
            return Object.assign({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_DIARY_LIST):
            return Object.assign({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_DIARY):
            return Object.assign({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_DIARY):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_DIARY):
            return Object.assign({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_DIARY):
            return Object.assign({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
const apiUrl = 'api/diaries';
// Actions
const getEntities = (page, size, sort) => ({
    type: ACTION_TYPES.FETCH_DIARY_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});
const getEntity = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_DIARY,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
const createEntity = entity => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.CREATE_DIARY,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
    });
    dispatch(getEntities());
    return result;
});
const updateEntity = entity => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.UPDATE_DIARY,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
    });
    dispatch(getEntities());
    return result;
});
const deleteEntity = id => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const requestUrl = `${apiUrl}/${id}`;
    const result = yield dispatch({
        type: ACTION_TYPES.DELETE_DIARY,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
    });
    dispatch(getEntities());
    return result;
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/diary/diary.tsx":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/entities/diary/diary.tsx ***!
  \******************************************************/
/*! exports provided: Diary, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diary", function() { return Diary; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _diary_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./diary.reducer */ "./src/main/webapp/app/entities/diary/diary.reducer.ts");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");








class Diary extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getEntities();
    }
    render() {
        const { diaryList, match } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "diary-heading" },
                "Diaries",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: `${match.url}/new`, className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0 Create a new Diary")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "table-responsive" }, diaryList && diaryList.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Table"], { responsive: true, "aria-describedby": "diary-heading" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "ID"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Content"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Created At"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "User Id"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "N"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, diaryList.map((diary, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: `entity-${i}` },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${diary.id}`, color: "link", size: "sm" }, diary.id)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, diary.content),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["TextFormat"], { type: "date", value: diary.createdAt, format: app_config_constants__WEBPACK_IMPORTED_MODULE_7__["APP_LOCAL_DATE_FORMAT"] })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, diary.userId),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, diary.n),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "text-right" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${diary.id}`, color: "info", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "eye" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "View")),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${diary.id}/edit`, color: "primary", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Edit")),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${diary.id}/delete`, color: "danger", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "trash" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Delete")))))))))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert alert-warning" }, "No Diaries found")))));
    }
}
const mapStateToProps = ({ diary }) => ({
    diaryList: diary.entities
});
const mapDispatchToProps = {
    getEntities: _diary_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Diary));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/diary.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/diary/index.tsx":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/entities/diary/index.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _diary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./diary */ "./src/main/webapp/app/entities/diary/diary.tsx");
/* harmony import */ var _diary_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diary-detail */ "./src/main/webapp/app/entities/diary/diary-detail.tsx");
/* harmony import */ var _diary_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./diary-update */ "./src/main/webapp/app/entities/diary/diary-update.tsx");
/* harmony import */ var _diary_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./diary-delete-dialog */ "./src/main/webapp/app/entities/diary/diary-delete-dialog.tsx");







const Routes = ({ match }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/new`, component: _diary_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:id/edit`, component: _diary_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:id`, component: _diary_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _diary__WEBPACK_IMPORTED_MODULE_3__["default"] })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: `${match.url}/:id/delete`, component: _diary_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/diary/index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/face-image/face-image-delete-dialog.tsx":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/entities/face-image/face-image-delete-dialog.tsx ***!
  \******************************************************************************/
/*! exports provided: FaceImageDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaceImageDeleteDialog", function() { return FaceImageDeleteDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _face_image_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./face-image.reducer */ "./src/main/webapp/app/entities/face-image/face-image.reducer.ts");





class FaceImageDeleteDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.confirmDelete = event => {
            this.props.deleteEntity(this.props.faceImageEntity.id);
            this.handleClose(event);
        };
        this.handleClose = event => {
            event.stopPropagation();
            this.props.history.goBack();
        };
    }
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }
    render() {
        const { faceImageEntity } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalHeader"], { toggle: this.handleClose }, "Confirm delete operation"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalBody"], { id: "junctionApp.faceImage.delete.question" }, "Are you sure you want to delete this FaceImage?"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0 Cancel"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { id: "jhi-confirm-delete-faceImage", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0 Delete"))));
    }
}
const mapStateToProps = ({ faceImage }) => ({
    faceImageEntity: faceImage.entity
});
const mapDispatchToProps = { getEntity: _face_image_reducer__WEBPACK_IMPORTED_MODULE_4__["getEntity"], deleteEntity: _face_image_reducer__WEBPACK_IMPORTED_MODULE_4__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FaceImageDeleteDialog));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image-delete-dialog.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/face-image/face-image-detail.tsx":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/face-image/face-image-detail.tsx ***!
  \***********************************************************************/
/*! exports provided: FaceImageDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaceImageDetail", function() { return FaceImageDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _face_image_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./face-image.reducer */ "./src/main/webapp/app/entities/face-image/face-image.reducer.ts");






class FaceImageDetail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }
    render() {
        const { faceImageEntity } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null,
                    "FaceImage [",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, faceImageEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "emotions" }, "Emotions")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, faceImageEntity.emotions)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: "/face-image", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Back")),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `/face-image/${faceImageEntity.id}/edit`, replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Edit")))));
    }
}
const mapStateToProps = ({ faceImage }) => ({
    faceImageEntity: faceImage.entity
});
const mapDispatchToProps = { getEntity: _face_image_reducer__WEBPACK_IMPORTED_MODULE_5__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FaceImageDetail));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image-detail.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/face-image/face-image-update.tsx":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/face-image/face-image-update.tsx ***!
  \***********************************************************************/
/*! exports provided: FaceImageUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaceImageUpdate", function() { return FaceImageUpdate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _face_image_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./face-image.reducer */ "./src/main/webapp/app/entities/face-image/face-image.reducer.ts");







class FaceImageUpdate extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.saveEntity = (event, errors, values) => {
            if (errors.length === 0) {
                const { faceImageEntity } = this.props;
                const entity = Object.assign({}, faceImageEntity, values);
                if (this.state.isNew) {
                    this.props.createEntity(entity);
                }
                else {
                    this.props.updateEntity(entity);
                }
            }
        };
        this.handleClose = () => {
            this.props.history.push('/face-image');
        };
        this.state = {
            isNew: !this.props.match.params || !this.props.match.params.id
        };
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    }
    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
    }
    render() {
        const { faceImageEntity, loading, updating } = this.props;
        const { isNew } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "junctionApp.faceImage.home.createOrEditLabel" }, "Create or edit a FaceImage"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { model: isNew ? {} : faceImageEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "face-image-id" }, "ID"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { id: "face-image-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { id: "emotionsLabel", for: "face-image-emotions" }, "Emotions"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "face-image-emotions", type: "text", name: "emotions" })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], id: "cancel-save", to: "/face-image", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Back")),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0 Save")))))));
    }
}
const mapStateToProps = (storeState) => ({
    faceImageEntity: storeState.faceImage.entity,
    loading: storeState.faceImage.loading,
    updating: storeState.faceImage.updating,
    updateSuccess: storeState.faceImage.updateSuccess
});
const mapDispatchToProps = {
    getEntity: _face_image_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"],
    updateEntity: _face_image_reducer__WEBPACK_IMPORTED_MODULE_6__["updateEntity"],
    createEntity: _face_image_reducer__WEBPACK_IMPORTED_MODULE_6__["createEntity"],
    reset: _face_image_reducer__WEBPACK_IMPORTED_MODULE_6__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FaceImageUpdate));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image-update.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/face-image/face-image.reducer.ts":
/*!***********************************************************************!*\
  !*** ./src/main/webapp/app/entities/face-image/face-image.reducer.ts ***!
  \***********************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_face_image_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/face-image.model */ "./src/main/webapp/app/shared/model/face-image.model.ts");





const ACTION_TYPES = {
    FETCH_FACEIMAGE_LIST: 'faceImage/FETCH_FACEIMAGE_LIST',
    FETCH_FACEIMAGE: 'faceImage/FETCH_FACEIMAGE',
    CREATE_FACEIMAGE: 'faceImage/CREATE_FACEIMAGE',
    UPDATE_FACEIMAGE: 'faceImage/UPDATE_FACEIMAGE',
    DELETE_FACEIMAGE: 'faceImage/DELETE_FACEIMAGE',
    RESET: 'faceImage/RESET'
};
const initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_face_image_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_FACEIMAGE_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_FACEIMAGE):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_FACEIMAGE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_FACEIMAGE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_FACEIMAGE):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_FACEIMAGE_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_FACEIMAGE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_FACEIMAGE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_FACEIMAGE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_FACEIMAGE):
            return Object.assign({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_FACEIMAGE_LIST):
            return Object.assign({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_FACEIMAGE):
            return Object.assign({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_FACEIMAGE):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_FACEIMAGE):
            return Object.assign({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_FACEIMAGE):
            return Object.assign({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
const apiUrl = 'api/face-images';
// Actions
const getEntities = (page, size, sort) => ({
    type: ACTION_TYPES.FETCH_FACEIMAGE_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});
const getEntity = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_FACEIMAGE,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
const createEntity = entity => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.CREATE_FACEIMAGE,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
    });
    dispatch(getEntities());
    return result;
});
const updateEntity = entity => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.UPDATE_FACEIMAGE,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
    });
    dispatch(getEntities());
    return result;
});
const deleteEntity = id => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const requestUrl = `${apiUrl}/${id}`;
    const result = yield dispatch({
        type: ACTION_TYPES.DELETE_FACEIMAGE,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
    });
    dispatch(getEntities());
    return result;
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/face-image/face-image.tsx":
/*!****************************************************************!*\
  !*** ./src/main/webapp/app/entities/face-image/face-image.tsx ***!
  \****************************************************************/
/*! exports provided: FaceImage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaceImage", function() { return FaceImage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _face_image_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./face-image.reducer */ "./src/main/webapp/app/entities/face-image/face-image.reducer.ts");






class FaceImage extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getEntities();
    }
    render() {
        const { faceImageList, match } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "face-image-heading" },
                "Face Images",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: `${match.url}/new`, className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0 Create a new Face Image")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "table-responsive" }, faceImageList && faceImageList.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Table"], { responsive: true, "aria-describedby": "face-image-heading" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "ID"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Emotions"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, faceImageList.map((faceImage, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: `entity-${i}` },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${faceImage.id}`, color: "link", size: "sm" }, faceImage.id)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, faceImage.emotions),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "text-right" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${faceImage.id}`, color: "info", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "eye" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "View")),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${faceImage.id}/edit`, color: "primary", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Edit")),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${faceImage.id}/delete`, color: "danger", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "trash" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Delete")))))))))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert alert-warning" }, "No Face Images found")))));
    }
}
const mapStateToProps = ({ faceImage }) => ({
    faceImageList: faceImage.entities
});
const mapDispatchToProps = {
    getEntities: _face_image_reducer__WEBPACK_IMPORTED_MODULE_5__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FaceImage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/face-image.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/face-image/index.tsx":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/entities/face-image/index.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _face_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./face-image */ "./src/main/webapp/app/entities/face-image/face-image.tsx");
/* harmony import */ var _face_image_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./face-image-detail */ "./src/main/webapp/app/entities/face-image/face-image-detail.tsx");
/* harmony import */ var _face_image_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./face-image-update */ "./src/main/webapp/app/entities/face-image/face-image-update.tsx");
/* harmony import */ var _face_image_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./face-image-delete-dialog */ "./src/main/webapp/app/entities/face-image/face-image-delete-dialog.tsx");







const Routes = ({ match }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/new`, component: _face_image_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:id/edit`, component: _face_image_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:id`, component: _face_image_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _face_image__WEBPACK_IMPORTED_MODULE_3__["default"] })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: `${match.url}/:id/delete`, component: _face_image_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/face-image/index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/hospital/hospital-delete-dialog.tsx":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/entities/hospital/hospital-delete-dialog.tsx ***!
  \**************************************************************************/
/*! exports provided: HospitalDeleteDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HospitalDeleteDialog", function() { return HospitalDeleteDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _hospital_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hospital.reducer */ "./src/main/webapp/app/entities/hospital/hospital.reducer.ts");





class HospitalDeleteDialog extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.confirmDelete = event => {
            this.props.deleteEntity(this.props.hospitalEntity.id);
            this.handleClose(event);
        };
        this.handleClose = event => {
            event.stopPropagation();
            this.props.history.goBack();
        };
    }
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }
    render() {
        const { hospitalEntity } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], { isOpen: true, toggle: this.handleClose },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalHeader"], { toggle: this.handleClose }, "Confirm delete operation"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalBody"], { id: "junctionApp.hospital.delete.question" }, "Are you sure you want to delete this Hospital?"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalFooter"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { color: "secondary", onClick: this.handleClose },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], { icon: "ban" }),
                    "\u00A0 Cancel"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { id: "jhi-confirm-delete-hospital", color: "danger", onClick: this.confirmDelete },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], { icon: "trash" }),
                    "\u00A0 Delete"))));
    }
}
const mapStateToProps = ({ hospital }) => ({
    hospitalEntity: hospital.entity
});
const mapDispatchToProps = { getEntity: _hospital_reducer__WEBPACK_IMPORTED_MODULE_4__["getEntity"], deleteEntity: _hospital_reducer__WEBPACK_IMPORTED_MODULE_4__["deleteEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(HospitalDeleteDialog));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital-delete-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital-delete-dialog.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/hospital/hospital-detail.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/entities/hospital/hospital-detail.tsx ***!
  \*******************************************************************/
/*! exports provided: HospitalDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HospitalDetail", function() { return HospitalDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _hospital_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hospital.reducer */ "./src/main/webapp/app/entities/hospital/hospital.reducer.ts");






class HospitalDetail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }
    render() {
        const { hospitalEntity } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null,
                    "Hospital [",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, hospitalEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "name" }, "Name")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, hospitalEntity.name),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "city" }, "City")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, hospitalEntity.city)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: "/hospital", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Back")),
                "\u00A0",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `/hospital/${hospitalEntity.id}/edit`, replace: true, color: "primary" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Edit")))));
    }
}
const mapStateToProps = ({ hospital }) => ({
    hospitalEntity: hospital.entity
});
const mapDispatchToProps = { getEntity: _hospital_reducer__WEBPACK_IMPORTED_MODULE_5__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(HospitalDetail));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital-detail.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/hospital/hospital-update.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/entities/hospital/hospital-update.tsx ***!
  \*******************************************************************/
/*! exports provided: HospitalUpdate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HospitalUpdate", function() { return HospitalUpdate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _hospital_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hospital.reducer */ "./src/main/webapp/app/entities/hospital/hospital.reducer.ts");







class HospitalUpdate extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor(props) {
        super(props);
        this.saveEntity = (event, errors, values) => {
            if (errors.length === 0) {
                const { hospitalEntity } = this.props;
                const entity = Object.assign({}, hospitalEntity, values);
                if (this.state.isNew) {
                    this.props.createEntity(entity);
                }
                else {
                    this.props.updateEntity(entity);
                }
            }
        };
        this.handleClose = () => {
            this.props.history.push('/hospital');
        };
        this.state = {
            isNew: !this.props.match.params || !this.props.match.params.id
        };
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
            this.handleClose();
        }
    }
    componentDidMount() {
        if (this.state.isNew) {
            this.props.reset();
        }
        else {
            this.props.getEntity(this.props.match.params.id);
        }
    }
    render() {
        const { hospitalEntity, loading, updating } = this.props;
        const { isNew } = this.state;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "junctionApp.hospital.home.createOrEditLabel" }, "Create or edit a Hospital"))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" }, loading ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Loading...")) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvForm"], { model: isNew ? {} : hospitalEntity, onSubmit: this.saveEntity },
                    !isNew ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { for: "hospital-id" }, "ID"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvInput"], { id: "hospital-id", type: "text", className: "form-control", name: "id", required: true, readOnly: true }))) : null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { id: "nameLabel", for: "hospital-name" }, "Name"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "hospital-name", type: "text", name: "name" })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvGroup"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Label"], { id: "cityLabel", for: "hospital-city" }, "City"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_4__["AvField"], { id: "hospital-city", type: "text", name: "city" })),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], id: "cancel-save", to: "/hospital", replace: true, color: "info" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "arrow-left" }),
                        "\u00A0",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Back")),
                    "\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "primary", id: "save-entity", type: "submit", disabled: updating },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__["FontAwesomeIcon"], { icon: "save" }),
                        "\u00A0 Save")))))));
    }
}
const mapStateToProps = (storeState) => ({
    hospitalEntity: storeState.hospital.entity,
    loading: storeState.hospital.loading,
    updating: storeState.hospital.updating,
    updateSuccess: storeState.hospital.updateSuccess
});
const mapDispatchToProps = {
    getEntity: _hospital_reducer__WEBPACK_IMPORTED_MODULE_6__["getEntity"],
    updateEntity: _hospital_reducer__WEBPACK_IMPORTED_MODULE_6__["updateEntity"],
    createEntity: _hospital_reducer__WEBPACK_IMPORTED_MODULE_6__["createEntity"],
    reset: _hospital_reducer__WEBPACK_IMPORTED_MODULE_6__["reset"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(HospitalUpdate));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital-update.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital-update.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/hospital/hospital.reducer.ts":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/entities/hospital/hospital.reducer.ts ***!
  \*******************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, createEntity, updateEntity, deleteEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEntity", function() { return createEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEntity", function() { return updateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteEntity", function() { return deleteEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/util/entity-utils */ "./src/main/webapp/app/shared/util/entity-utils.ts");
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_hospital_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/model/hospital.model */ "./src/main/webapp/app/shared/model/hospital.model.ts");





const ACTION_TYPES = {
    FETCH_HOSPITAL_LIST: 'hospital/FETCH_HOSPITAL_LIST',
    FETCH_HOSPITAL: 'hospital/FETCH_HOSPITAL',
    CREATE_HOSPITAL: 'hospital/CREATE_HOSPITAL',
    UPDATE_HOSPITAL: 'hospital/UPDATE_HOSPITAL',
    DELETE_HOSPITAL: 'hospital/DELETE_HOSPITAL',
    RESET: 'hospital/RESET'
};
const initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_hospital_model__WEBPACK_IMPORTED_MODULE_4__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_HOSPITAL_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.FETCH_HOSPITAL):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.CREATE_HOSPITAL):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.UPDATE_HOSPITAL):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.DELETE_HOSPITAL):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_HOSPITAL_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.FETCH_HOSPITAL):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.CREATE_HOSPITAL):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.UPDATE_HOSPITAL):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.DELETE_HOSPITAL):
            return Object.assign({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_HOSPITAL_LIST):
            return Object.assign({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.FETCH_HOSPITAL):
            return Object.assign({}, state, { loading: false, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.CREATE_HOSPITAL):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.UPDATE_HOSPITAL):
            return Object.assign({}, state, { updating: false, updateSuccess: true, entity: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.DELETE_HOSPITAL):
            return Object.assign({}, state, { updating: false, updateSuccess: true, entity: {} });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
const apiUrl = 'api/hospitals';
// Actions
const getEntities = (page, size, sort) => ({
    type: ACTION_TYPES.FETCH_HOSPITAL_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});
const getEntity = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_HOSPITAL,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
const createEntity = entity => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.CREATE_HOSPITAL,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
    });
    dispatch(getEntities());
    return result;
});
const updateEntity = entity => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.UPDATE_HOSPITAL,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, Object(app_shared_util_entity_utils__WEBPACK_IMPORTED_MODULE_2__["cleanEntity"])(entity))
    });
    dispatch(getEntities());
    return result;
});
const deleteEntity = id => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const requestUrl = `${apiUrl}/${id}`;
    const result = yield dispatch({
        type: ACTION_TYPES.DELETE_HOSPITAL,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
    });
    dispatch(getEntities());
    return result;
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/hospital/hospital.tsx":
/*!************************************************************!*\
  !*** ./src/main/webapp/app/entities/hospital/hospital.tsx ***!
  \************************************************************/
/*! exports provided: Hospital, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hospital", function() { return Hospital; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _hospital_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hospital.reducer */ "./src/main/webapp/app/entities/hospital/hospital.reducer.ts");






class Hospital extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getEntities();
    }
    render() {
        const { hospitalList, match } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "hospital-heading" },
                "Hospitals",
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: `${match.url}/new`, className: "btn btn-primary float-right jh-create-entity", id: "jh-create-entity" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "plus" }),
                    "\u00A0 Create a new Hospital")),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "table-responsive" }, hospitalList && hospitalList.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Table"], { responsive: true, "aria-describedby": "hospital-heading" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "ID"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Name"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "City"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, hospitalList.map((hospital, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: `entity-${i}` },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${hospital.id}`, color: "link", size: "sm" }, hospital.id)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, hospital.name),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, hospital.city),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "text-right" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${hospital.id}`, color: "info", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "eye" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "View")),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${hospital.id}/edit`, color: "primary", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "pencil-alt" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Edit")),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${hospital.id}/delete`, color: "danger", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "trash" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Delete")))))))))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert alert-warning" }, "No Hospitals found")))));
    }
}
const mapStateToProps = ({ hospital }) => ({
    hospitalList: hospital.entities
});
const mapDispatchToProps = {
    getEntities: _hospital_reducer__WEBPACK_IMPORTED_MODULE_5__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Hospital));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/hospital.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/hospital/index.tsx":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/entities/hospital/index.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _hospital__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hospital */ "./src/main/webapp/app/entities/hospital/hospital.tsx");
/* harmony import */ var _hospital_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hospital-detail */ "./src/main/webapp/app/entities/hospital/hospital-detail.tsx");
/* harmony import */ var _hospital_update__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hospital-update */ "./src/main/webapp/app/entities/hospital/hospital-update.tsx");
/* harmony import */ var _hospital_delete_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hospital-delete-dialog */ "./src/main/webapp/app/entities/hospital/hospital-delete-dialog.tsx");







const Routes = ({ match }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/new`, component: _hospital_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:id/edit`, component: _hospital_update__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:id`, component: _hospital_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _hospital__WEBPACK_IMPORTED_MODULE_3__["default"] })),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: `${match.url}/:id/delete`, component: _hospital_delete_dialog__WEBPACK_IMPORTED_MODULE_6__["default"] })));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/hospital/index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/index.tsx":
/*!************************************************!*\
  !*** ./src/main/webapp/app/entities/index.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _hospital__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hospital */ "./src/main/webapp/app/entities/hospital/index.tsx");
/* harmony import */ var _diary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diary */ "./src/main/webapp/app/entities/diary/index.tsx");
/* harmony import */ var _therapist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./therapist */ "./src/main/webapp/app/entities/therapist/index.tsx");
/* harmony import */ var _face_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./face-image */ "./src/main/webapp/app/entities/face-image/index.tsx");


// eslint-disable-next-line @typescript-eslint/no-unused-vars





/* jhipster-needle-add-route-import - JHipster will add routes here */
const Routes = ({ match }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: `${match.url}hospital`, component: _hospital__WEBPACK_IMPORTED_MODULE_3__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: `${match.url}diary`, component: _diary__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: `${match.url}therapist`, component: _therapist__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: `${match.url}face-image`, component: _face_image__WEBPACK_IMPORTED_MODULE_6__["default"] }))));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/therapist/index.tsx":
/*!**********************************************************!*\
  !*** ./src/main/webapp/app/entities/therapist/index.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var _therapist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./therapist */ "./src/main/webapp/app/entities/therapist/therapist.tsx");
/* harmony import */ var _therapist_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./therapist-detail */ "./src/main/webapp/app/entities/therapist/therapist-detail.tsx");





const Routes = ({ match }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { exact: true, path: `${match.url}/:id`, component: _therapist_detail__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_2__["default"], { path: match.url, component: _therapist__WEBPACK_IMPORTED_MODULE_3__["default"] }))));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/therapist/index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/therapist/index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/therapist/therapist-detail.tsx":
/*!*********************************************************************!*\
  !*** ./src/main/webapp/app/entities/therapist/therapist-detail.tsx ***!
  \*********************************************************************/
/*! exports provided: TherapistDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TherapistDetail", function() { return TherapistDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _therapist_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./therapist.reducer */ "./src/main/webapp/app/entities/therapist/therapist.reducer.ts");






class TherapistDetail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getEntity(this.props.match.params.id);
    }
    render() {
        const { therapistEntity } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null,
                    "Therapist [",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, therapistEntity.id),
                    "]"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dl", { className: "jh-entity-details" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "name" }, "Name")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, therapistEntity.name),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "expertise" }, "Expertise")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, therapistEntity.expertise),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { id: "userId" }, "User Id")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, therapistEntity.userId)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: "/therapist", replace: true, color: "info" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "arrow-left" }),
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "Back")),
                "\u00A0")));
    }
}
const mapStateToProps = ({ therapist }) => ({
    therapistEntity: therapist.entity
});
const mapDispatchToProps = { getEntity: _therapist_reducer__WEBPACK_IMPORTED_MODULE_5__["getEntity"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(TherapistDetail));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/therapist/therapist-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/therapist/therapist-detail.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/therapist/therapist.reducer.ts":
/*!*********************************************************************!*\
  !*** ./src/main/webapp/app/entities/therapist/therapist.reducer.ts ***!
  \*********************************************************************/
/*! exports provided: ACTION_TYPES, default, getEntities, getEntity, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntities", function() { return getEntities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntity", function() { return getEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_therapist_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/model/therapist.model */ "./src/main/webapp/app/shared/model/therapist.model.ts");



const ACTION_TYPES = {
    FETCH_THERAPIST_LIST: 'therapist/FETCH_THERAPIST_LIST',
    FETCH_THERAPIST: 'therapist/FETCH_THERAPIST',
    RESET: 'therapist/RESET'
};
const initialState = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: app_shared_model_therapist_model__WEBPACK_IMPORTED_MODULE_2__["defaultValue"],
    updating: false,
    updateSuccess: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["REQUEST"])(ACTION_TYPES.FETCH_THERAPIST_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["REQUEST"])(ACTION_TYPES.FETCH_THERAPIST):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["FAILURE"])(ACTION_TYPES.FETCH_THERAPIST_LIST):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["FAILURE"])(ACTION_TYPES.FETCH_THERAPIST):
            return Object.assign({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"])(ACTION_TYPES.FETCH_THERAPIST_LIST):
            return Object.assign({}, state, { loading: false, entities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"])(ACTION_TYPES.FETCH_THERAPIST):
            return Object.assign({}, state, { loading: false, entity: action.payload.data });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
const apiUrl = 'api/therapists';
// Actions
const getEntities = (page, size, sort) => ({
    type: ACTION_TYPES.FETCH_THERAPIST_LIST,
    payload: axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});
const getEntity = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_THERAPIST,
        payload: axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(requestUrl)
    };
};
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/therapist/therapist.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/therapist/therapist.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/entities/therapist/therapist.tsx":
/*!**************************************************************!*\
  !*** ./src/main/webapp/app/entities/therapist/therapist.tsx ***!
  \**************************************************************/
/*! exports provided: Therapist, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Therapist", function() { return Therapist; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _therapist_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./therapist.reducer */ "./src/main/webapp/app/entities/therapist/therapist.reducer.ts");






class Therapist extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.getEntities();
    }
    render() {
        const { therapistList, match } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { id: "therapist-heading" }, "Therapists"),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "table-responsive" }, therapistList && therapistList.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Table"], { responsive: true, "aria-describedby": "therapist-heading" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "ID"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Name"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Expertise"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "User Id"),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, therapistList.map((therapist, i) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: `entity-${i}` },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${therapist.id}`, color: "link", size: "sm" }, therapist.id)),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, therapist.name),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, therapist.expertise),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, therapist.userId),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "text-right" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "btn-group flex-btn-group-container" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], to: `${match.url}/${therapist.id}`, color: "info", size: "sm" },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_4__["FontAwesomeIcon"], { icon: "eye" }),
                                " ",
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "d-none d-md-inline" }, "View")))))))))) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert alert-warning" }, "No Therapists found")))));
    }
}
const mapStateToProps = ({ therapist }) => ({
    therapistList: therapist.entities
});
const mapDispatchToProps = {
    getEntities: _therapist_reducer__WEBPACK_IMPORTED_MODULE_5__["getEntities"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Therapist));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/entities/therapist/therapist.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/entities/therapist/therapist.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/index.tsx":
/*!***************************************!*\
  !*** ./src/main/webapp/app/index.tsx ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _config_devtools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/devtools */ "./src/main/webapp/app/config/devtools.tsx");
/* harmony import */ var _config_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config/store */ "./src/main/webapp/app/config/store.ts");
/* harmony import */ var _config_axios_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config/axios-interceptor */ "./src/main/webapp/app/config/axios-interceptor.ts");
/* harmony import */ var _shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var _shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/error/error-boundary */ "./src/main/webapp/app/shared/error/error-boundary.tsx");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app */ "./src/main/webapp/app/app.tsx");
/* harmony import */ var _config_icon_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./config/icon-loader */ "./src/main/webapp/app/config/icon-loader.ts");











const devTools =  true ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_config_devtools__WEBPACK_IMPORTED_MODULE_4__["default"], null) : undefined;
const store = Object(_config_store__WEBPACK_IMPORTED_MODULE_5__["default"])();
const actions = Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])({ clearAuthentication: _shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_7__["clearAuthentication"] }, store.dispatch);
Object(_config_axios_interceptor__WEBPACK_IMPORTED_MODULE_6__["default"])(() => actions.clearAuthentication('login.error.unauthorized'));
Object(_config_icon_loader__WEBPACK_IMPORTED_MODULE_10__["loadIcons"])();
const rootEl = document.getElementById('root');
const render = Component => 
// eslint-disable-next-line react/no-render-return-value
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_8__["default"], null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], { store: store },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            devTools,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, null)))), rootEl);
render(_app__WEBPACK_IMPORTED_MODULE_9__["default"]);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/index.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/activate/activate.reducer.ts":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/activate/activate.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: ACTION_TYPES, default, activateAction, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activateAction", function() { return activateAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");


const ACTION_TYPES = {
    ACTIVATE_ACCOUNT: 'activate/ACTIVATE_ACCOUNT',
    RESET: 'activate/RESET'
};
const initialState = {
    activationSuccess: false,
    activationFailure: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["REQUEST"])(ACTION_TYPES.ACTIVATE_ACCOUNT):
            return Object.assign({}, state);
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["FAILURE"])(ACTION_TYPES.ACTIVATE_ACCOUNT):
            return Object.assign({}, state, { activationFailure: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"])(ACTION_TYPES.ACTIVATE_ACCOUNT):
            return Object.assign({}, state, { activationSuccess: true });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
// Actions
const activateAction = key => ({
    type: ACTION_TYPES.ACTIVATE_ACCOUNT,
    payload: axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('api/activate?key=' + key)
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/activate/activate.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/activate/activate.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/activate/activate.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/activate/activate.tsx ***!
  \*******************************************************************/
/*! exports provided: ActivatePage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivatePage", function() { return ActivatePage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _activate_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activate.reducer */ "./src/main/webapp/app/modules/account/activate/activate.reducer.ts");






const successAlert = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], { color: "success" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Your user account has been activated."),
    " Please",
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: "/login", className: "alert-link" }, "sign in"),
    "."));
const failureAlert = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], { color: "danger" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Your user could not be activated."),
    " Please use the registration form to sign up."));
const ActivatePage = (props) => {
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        const key = Object(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["getUrlParameter"])('key', props.location.search);
        props.activateAction(key);
        return () => {
            props.reset();
        };
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Activation"),
                props.activationSuccess ? successAlert : undefined,
                props.activationFailure ? failureAlert : undefined))));
};
const mapStateToProps = ({ activate }) => ({
    activationSuccess: activate.activationSuccess,
    activationFailure: activate.activationFailure
});
const mapDispatchToProps = { activateAction: _activate_reducer__WEBPACK_IMPORTED_MODULE_5__["activateAction"], reset: _activate_reducer__WEBPACK_IMPORTED_MODULE_5__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(ActivatePage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/activate/activate.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/activate/activate.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password-reset/finish/password-reset-finish.tsx":
/*!*********************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password-reset/finish/password-reset-finish.tsx ***!
  \*********************************************************************************************/
/*! exports provided: PasswordResetFinishPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetFinishPage", function() { return PasswordResetFinishPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _password_reset_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../password-reset.reducer */ "./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts");
/* harmony import */ var app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/shared/layout/password/password-strength-bar */ "./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx");







const PasswordResetFinishPage = (props) => {
    const [password, setPassword] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
    const [key] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(Object(react_jhipster__WEBPACK_IMPORTED_MODULE_4__["getUrlParameter"])('key', props.location.search));
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => () => props.reset(), []);
    const handleValidSubmit = (event, values) => props.handlePasswordResetFinish(key, values.newPassword);
    const updatePassword = event => setPassword(event.target.value);
    const getResetForm = () => {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__["AvForm"], { onValidSubmit: handleValidSubmit },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__["AvField"], { name: "newPassword", label: "New password", placeholder: 'New password', type: "password", validate: {
                    required: { value: true, errorMessage: 'Your password is required.' },
                    minLength: { value: 4, errorMessage: 'Your password is required to be at least 4 characters.' },
                    maxLength: { value: 50, errorMessage: 'Your password cannot be longer than 50 characters.' }
                }, onChange: updatePassword }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_6__["default"], { password: password }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_3__["AvField"], { name: "confirmPassword", label: "New password confirmation", placeholder: "Confirm the new password", type: "password", validate: {
                    required: { value: true, errorMessage: 'Your confirmation password is required.' },
                    minLength: { value: 4, errorMessage: 'Your confirmation password is required to be at least 4 characters.' },
                    maxLength: { value: 50, errorMessage: 'Your confirmation password cannot be longer than 50 characters.' },
                    match: { value: 'newPassword', errorMessage: 'The password and its confirmation do not match!' }
                } }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], { color: "success", type: "submit" }, "Validate new password")));
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], { className: "justify-content-center" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { md: "4" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Reset password"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, key ? getResetForm() : null)))));
};
const mapDispatchToProps = { handlePasswordResetFinish: _password_reset_reducer__WEBPACK_IMPORTED_MODULE_5__["handlePasswordResetFinish"], reset: _password_reset_reducer__WEBPACK_IMPORTED_MODULE_5__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(PasswordResetFinishPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password-reset/finish/password-reset-finish.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password-reset/finish/password-reset-finish.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password-reset/init/password-reset-init.tsx":
/*!*****************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password-reset/init/password-reset-init.tsx ***!
  \*****************************************************************************************/
/*! exports provided: PasswordResetInit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordResetInit", function() { return PasswordResetInit; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _password_reset_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../password-reset.reducer */ "./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts");





class PasswordResetInit extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.handleValidSubmit = (event, values) => {
            this.props.handlePasswordResetInit(values.email);
            event.preventDefault();
        };
    }
    componentWillUnmount() {
        this.props.reset();
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Reset your password"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], { color: "warning" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Enter the email address you used to register")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvForm"], { onValidSubmit: this.handleValidSubmit },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "email", label: "Email", placeholder: 'Your email', type: "email", validate: {
                                required: { value: true, errorMessage: 'Your email is required.' },
                                minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                                maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' }
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { color: "primary", type: "submit" }, "Reset password"))))));
    }
}
const mapDispatchToProps = { handlePasswordResetInit: _password_reset_reducer__WEBPACK_IMPORTED_MODULE_4__["handlePasswordResetInit"], reset: _password_reset_reducer__WEBPACK_IMPORTED_MODULE_4__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(PasswordResetInit));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password-reset/init/password-reset-init.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password-reset/init/password-reset-init.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts":
/*!**************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts ***!
  \**************************************************************************************/
/*! exports provided: ACTION_TYPES, default, handlePasswordResetInit, handlePasswordResetFinish, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handlePasswordResetInit", function() { return handlePasswordResetInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handlePasswordResetFinish", function() { return handlePasswordResetFinish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");


const ACTION_TYPES = {
    RESET_PASSWORD_INIT: 'passwordReset/RESET_PASSWORD_INIT',
    RESET_PASSWORD_FINISH: 'passwordReset/RESET_PASSWORD_FINISH',
    RESET: 'passwordReset/RESET'
};
const initialState = {
    loading: false,
    resetPasswordSuccess: false,
    resetPasswordFailure: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["REQUEST"])(ACTION_TYPES.RESET_PASSWORD_FINISH):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["REQUEST"])(ACTION_TYPES.RESET_PASSWORD_INIT):
            return Object.assign({}, state, { loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["FAILURE"])(ACTION_TYPES.RESET_PASSWORD_FINISH):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["FAILURE"])(ACTION_TYPES.RESET_PASSWORD_INIT):
            return Object.assign({}, initialState, { loading: false, resetPasswordFailure: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"])(ACTION_TYPES.RESET_PASSWORD_FINISH):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"])(ACTION_TYPES.RESET_PASSWORD_INIT):
            return Object.assign({}, initialState, { loading: false, resetPasswordSuccess: true });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
const apiUrl = 'api/account/reset-password';
// Actions
const handlePasswordResetInit = mail => ({
    type: ACTION_TYPES.RESET_PASSWORD_INIT,
    // If the content-type isn't set that way, axios will try to encode the body and thus modify the data sent to the server.
    payload: axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${apiUrl}/init`, mail, { headers: { ['Content-Type']: 'text/plain' } }),
    meta: {
        successMessage: 'Check your emails for details on how to reset your password.',
        errorMessage: "<strong>Email address isn't registered!</strong> Please check and try again"
    }
});
const handlePasswordResetFinish = (key, newPassword) => ({
    type: ACTION_TYPES.RESET_PASSWORD_FINISH,
    payload: axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${apiUrl}/finish`, { key, newPassword }),
    meta: {
        successMessage: '<strong>Your password has been reset.</strong> Please '
    }
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/password/password.reducer.ts":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/password/password.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: ACTION_TYPES, default, savePassword, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "savePassword", function() { return savePassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");


const ACTION_TYPES = {
    UPDATE_PASSWORD: 'account/UPDATE_PASSWORD',
    RESET: 'account/RESET'
};
const initialState = {
    loading: false,
    errorMessage: null,
    updateSuccess: false,
    updateFailure: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["REQUEST"])(ACTION_TYPES.UPDATE_PASSWORD):
            return Object.assign({}, initialState, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["FAILURE"])(ACTION_TYPES.UPDATE_PASSWORD):
            return Object.assign({}, initialState, { loading: false, updateSuccess: false, updateFailure: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"])(ACTION_TYPES.UPDATE_PASSWORD):
            return Object.assign({}, initialState, { loading: false, updateSuccess: true, updateFailure: false });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
// Actions
const apiUrl = 'api/account';
const savePassword = (currentPassword, newPassword) => ({
    type: ACTION_TYPES.UPDATE_PASSWORD,
    payload: axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${apiUrl}/change-password`, { currentPassword, newPassword }),
    meta: {
        successMessage: '<strong>Password changed!</strong>',
        errorMessage: '<strong>An error has occurred!</strong> The password could not be changed.'
    }
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password/password.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/password/password.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/register/register.reducer.ts":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/register/register.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: ACTION_TYPES, default, handleRegister, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleRegister", function() { return handleRegister; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");


const ACTION_TYPES = {
    CREATE_ACCOUNT: 'register/CREATE_ACCOUNT',
    RESET: 'register/RESET'
};
const initialState = {
    loading: false,
    registrationSuccess: false,
    registrationFailure: false,
    errorMessage: null
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["REQUEST"])(ACTION_TYPES.CREATE_ACCOUNT):
            return Object.assign({}, state, { loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["FAILURE"])(ACTION_TYPES.CREATE_ACCOUNT):
            return Object.assign({}, initialState, { registrationFailure: true, errorMessage: action.payload.response.data.errorKey });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"])(ACTION_TYPES.CREATE_ACCOUNT):
            return Object.assign({}, initialState, { registrationSuccess: true });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
// Actions
const handleRegister = (login, email, password, langKey = 'en') => ({
    type: ACTION_TYPES.CREATE_ACCOUNT,
    payload: axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('api/register', { login, email, password, langKey }),
    meta: {
        successMessage: '<strong>Registration saved!</strong> Please check your email for confirmation.'
    }
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/register/register.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/register/register.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/register/register.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/register/register.tsx ***!
  \*******************************************************************/
/*! exports provided: RegisterPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPage", function() { return RegisterPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/layout/password/password-strength-bar */ "./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx");
/* harmony import */ var _register_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register.reducer */ "./src/main/webapp/app/modules/account/register/register.reducer.ts");






const RegisterPage = (props) => {
    const [password, setPassword] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => () => props.reset(), []);
    const handleValidSubmit = (event, values) => {
        props.handleRegister(values.username, values.email, values.firstPassword);
        event.preventDefault();
    };
    const updatePassword = event => setPassword(event.target.value);
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", { id: "register-title" }, "Registration"))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], { className: "justify-content-center" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], { md: "8" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvForm"], { id: "register-form", onValidSubmit: handleValidSubmit },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "username", label: "Username", placeholder: 'Your username', validate: {
                            required: { value: true, errorMessage: 'Your username is required.' },
                            pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: 'Your username can only contain letters and digits.' },
                            minLength: { value: 1, errorMessage: 'Your username is required to be at least 1 character.' },
                            maxLength: { value: 50, errorMessage: 'Your username cannot be longer than 50 characters.' }
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "email", label: "Email", placeholder: 'Your email', type: "email", validate: {
                            required: { value: true, errorMessage: 'Your email is required.' },
                            minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                            maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' }
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "firstPassword", label: "New password", placeholder: 'New password', type: "password", onChange: updatePassword, validate: {
                            required: { value: true, errorMessage: 'Your password is required.' },
                            minLength: { value: 4, errorMessage: 'Your password is required to be at least 4 characters.' },
                            maxLength: { value: 50, errorMessage: 'Your password cannot be longer than 50 characters.' }
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_password_password_strength_bar__WEBPACK_IMPORTED_MODULE_4__["default"], { password: password }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "secondPassword", label: "New password confirmation", placeholder: "Confirm the new password", type: "password", validate: {
                            required: { value: true, errorMessage: 'Your confirmation password is required.' },
                            minLength: { value: 4, errorMessage: 'Your confirmation password is required to be at least 4 characters.' },
                            maxLength: { value: 50, errorMessage: 'Your confirmation password cannot be longer than 50 characters.' },
                            match: { value: 'firstPassword', errorMessage: 'The password and its confirmation do not match!' }
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], { id: "register-submit", color: "primary", type: "submit" }, "Register")),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\u00A0"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Alert"], { color: "warning" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "If you want to"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { className: "alert-link" }, " sign in"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null,
                        ", you can try the default accounts:",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null),
                        "- Administrator (login=\"admin\" and password=\"admin\")",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null),
                        "- User (login=\"user\" and password=\"user\")."))))));
};
const mapDispatchToProps = { handleRegister: _register_reducer__WEBPACK_IMPORTED_MODULE_5__["handleRegister"], reset: _register_reducer__WEBPACK_IMPORTED_MODULE_5__["reset"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(RegisterPage));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/register/register.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/register/register.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/account/settings/settings.reducer.ts":
/*!**************************************************************************!*\
  !*** ./src/main/webapp/app/modules/account/settings/settings.reducer.ts ***!
  \**************************************************************************/
/*! exports provided: ACTION_TYPES, default, saveAccountSettings, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveAccountSettings", function() { return saveAccountSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");




const ACTION_TYPES = {
    UPDATE_ACCOUNT: 'account/UPDATE_ACCOUNT',
    RESET: 'account/RESET'
};
const initialState = {
    loading: false,
    errorMessage: null,
    updateSuccess: false,
    updateFailure: false
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.UPDATE_ACCOUNT):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.UPDATE_ACCOUNT):
            return Object.assign({}, state, { loading: false, updateSuccess: false, updateFailure: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.UPDATE_ACCOUNT):
            return Object.assign({}, state, { loading: false, updateSuccess: true, updateFailure: false });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
// Actions
const apiUrl = 'api/account';
const saveAccountSettings = account => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    yield dispatch({
        type: ACTION_TYPES.UPDATE_ACCOUNT,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, account),
        meta: {
            successMessage: '<strong>Settings saved!</strong>'
        }
    });
    yield dispatch(Object(app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_3__["getSession"])());
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/settings/settings.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/account/settings/settings.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/administration.reducer.ts":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/administration.reducer.ts ***!
  \******************************************************************************/
/*! exports provided: ACTION_TYPES, default, systemHealth, systemMetrics, systemThreadDump, getLoggers, changeLogLevel, getConfigurations, getEnv, getAudits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemHealth", function() { return systemHealth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemMetrics", function() { return systemMetrics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemThreadDump", function() { return systemThreadDump; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoggers", function() { return getLoggers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeLogLevel", function() { return changeLogLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfigurations", function() { return getConfigurations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEnv", function() { return getEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAudits", function() { return getAudits; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");



const ACTION_TYPES = {
    FETCH_LOGS: 'administration/FETCH_LOGS',
    FETCH_LOGS_CHANGE_LEVEL: 'administration/FETCH_LOGS_CHANGE_LEVEL',
    FETCH_HEALTH: 'administration/FETCH_HEALTH',
    FETCH_METRICS: 'administration/FETCH_METRICS',
    FETCH_THREAD_DUMP: 'administration/FETCH_THREAD_DUMP',
    FETCH_CONFIGURATIONS: 'administration/FETCH_CONFIGURATIONS',
    FETCH_ENV: 'administration/FETCH_ENV',
    FETCH_AUDITS: 'administration/FETCH_AUDITS'
};
const initialState = {
    loading: false,
    errorMessage: null,
    logs: {
        loggers: []
    },
    health: {},
    metrics: {},
    threadDump: [],
    configuration: {
        configProps: {},
        env: {}
    },
    audits: [],
    totalItems: 0
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_METRICS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_THREAD_DUMP):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_LOGS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_CONFIGURATIONS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_ENV):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_AUDITS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_HEALTH):
            return Object.assign({}, state, { errorMessage: null, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_METRICS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_THREAD_DUMP):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_LOGS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_CONFIGURATIONS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_ENV):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_AUDITS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_HEALTH):
            return Object.assign({}, state, { loading: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_METRICS):
            return Object.assign({}, state, { loading: false, metrics: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_THREAD_DUMP):
            return Object.assign({}, state, { loading: false, threadDump: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_LOGS):
            return Object.assign({}, state, { loading: false, logs: {
                    loggers: action.payload.data.loggers
                } });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_CONFIGURATIONS):
            return Object.assign({}, state, { loading: false, configuration: Object.assign({}, state.configuration, { configProps: action.payload.data }) });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_ENV):
            return Object.assign({}, state, { loading: false, configuration: Object.assign({}, state.configuration, { env: action.payload.data }) });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_AUDITS):
            return Object.assign({}, state, { loading: false, audits: action.payload.data, totalItems: parseInt(action.payload.headers['x-total-count'], 10) });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_HEALTH):
            return Object.assign({}, state, { loading: false, health: action.payload.data });
        default:
            return state;
    }
});
// Actions
const systemHealth = () => ({
    type: ACTION_TYPES.FETCH_HEALTH,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/health')
});
const systemMetrics = () => ({
    type: ACTION_TYPES.FETCH_METRICS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/jhimetrics')
});
const systemThreadDump = () => ({
    type: ACTION_TYPES.FETCH_THREAD_DUMP,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/threaddump')
});
const getLoggers = () => ({
    type: ACTION_TYPES.FETCH_LOGS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/loggers')
});
const changeLogLevel = (name, configuredLevel) => {
    const body = { configuredLevel };
    return (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
        yield dispatch({
            type: ACTION_TYPES.FETCH_LOGS_CHANGE_LEVEL,
            payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('management/loggers/' + name, body)
        });
        dispatch(getLoggers());
    });
};
const getConfigurations = () => ({
    type: ACTION_TYPES.FETCH_CONFIGURATIONS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/configprops')
});
const getEnv = () => ({
    type: ACTION_TYPES.FETCH_ENV,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('management/env')
});
const getAudits = (page, size, sort, fromDate, toDate) => {
    let requestUrl = `management/audits${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    if (fromDate) {
        requestUrl += `&fromDate=${fromDate}`;
    }
    if (toDate) {
        requestUrl += `&toDate=${toDate}`;
    }
    return {
        type: ACTION_TYPES.FETCH_AUDITS,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/administration/administration.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/administration/administration.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts":
/*!***********************************************************************************************!*\
  !*** ./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts ***!
  \***********************************************************************************************/
/*! exports provided: ACTION_TYPES, default, getUsers, getRoles, getUser, createUser, updateUser, deleteUser, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsers", function() { return getUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoles", function() { return getRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUser", function() { return getUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUser", function() { return createUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUser", function() { return updateUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteUser", function() { return deleteUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");
/* harmony import */ var app_shared_model_user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/model/user.model */ "./src/main/webapp/app/shared/model/user.model.ts");




const ACTION_TYPES = {
    FETCH_ROLES: 'userManagement/FETCH_ROLES',
    FETCH_USERS: 'userManagement/FETCH_USERS',
    FETCH_USER: 'userManagement/FETCH_USER',
    CREATE_USER: 'userManagement/CREATE_USER',
    UPDATE_USER: 'userManagement/UPDATE_USER',
    DELETE_USER: 'userManagement/DELETE_USER',
    RESET: 'userManagement/RESET'
};
const initialState = {
    loading: false,
    errorMessage: null,
    users: [],
    authorities: [],
    user: app_shared_model_user_model__WEBPACK_IMPORTED_MODULE_3__["defaultValue"],
    updating: false,
    updateSuccess: false,
    totalItems: 0
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_ROLES):
            return Object.assign({}, state);
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_USERS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.FETCH_USER):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.CREATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.UPDATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["REQUEST"])(ACTION_TYPES.DELETE_USER):
            return Object.assign({}, state, { errorMessage: null, updateSuccess: false, updating: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_USERS):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.FETCH_ROLES):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.CREATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.UPDATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["FAILURE"])(ACTION_TYPES.DELETE_USER):
            return Object.assign({}, state, { loading: false, updating: false, updateSuccess: false, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_ROLES):
            return Object.assign({}, state, { authorities: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_USERS):
            return Object.assign({}, state, { loading: false, users: action.payload.data, totalItems: parseInt(action.payload.headers['x-total-count'], 10) });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.FETCH_USER):
            return Object.assign({}, state, { loading: false, user: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.CREATE_USER):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.UPDATE_USER):
            return Object.assign({}, state, { updating: false, updateSuccess: true, user: action.payload.data });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"])(ACTION_TYPES.DELETE_USER):
            return Object.assign({}, state, { updating: false, updateSuccess: true, user: app_shared_model_user_model__WEBPACK_IMPORTED_MODULE_3__["defaultValue"] });
        case ACTION_TYPES.RESET:
            return Object.assign({}, initialState);
        default:
            return state;
    }
});
const apiUrl = 'api/users';
// Actions
const getUsers = (page, size, sort) => {
    const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
    return {
        type: ACTION_TYPES.FETCH_USERS,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
const getRoles = () => ({
    type: ACTION_TYPES.FETCH_ROLES,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`${apiUrl}/authorities`)
});
const getUser = id => {
    const requestUrl = `${apiUrl}/${id}`;
    return {
        type: ACTION_TYPES.FETCH_USER,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(requestUrl)
    };
};
const createUser = user => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.CREATE_USER,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(apiUrl, user)
    });
    dispatch(getUsers());
    return result;
});
const updateUser = user => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.UPDATE_USER,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put(apiUrl, user)
    });
    dispatch(getUsers());
    return result;
});
const deleteUser = id => (dispatch) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const requestUrl = `${apiUrl}/${id}`;
    const result = yield dispatch({
        type: ACTION_TYPES.DELETE_USER,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(requestUrl)
    });
    dispatch(getUsers());
    return result;
});
const reset = () => ({
    type: ACTION_TYPES.RESET
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/home/home.scss":
/*!****************************************************!*\
  !*** ./src/main/webapp/app/modules/home/home.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/postcss-loader/src!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./home.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/modules/home/home.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/postcss-loader/src!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./home.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/modules/home/home.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/postcss-loader/src!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./home.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/modules/home/home.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/modules/home/home.tsx":
/*!***************************************************!*\
  !*** ./src/main/webapp/app/modules/home/home.tsx ***!
  \***************************************************/
/*! exports provided: Home, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.scss */ "./src/main/webapp/app/modules/home/home.scss");
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");





const Home = (props) => {
    const { account } = props;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "9" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Welcome, Java Hipster!"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: "lead" }, "This is your homepage"),
            account && account.login ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], { color: "success" },
                    "You are logged in as user ",
                    account.login,
                    "."))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], { color: "warning" },
                    "If you want to",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: "/login", className: "alert-link" },
                        ' ',
                        "sign in"),
                    ", you can try the default accounts:",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                    "- Administrator (login=\"admin\" and password=\"admin\")",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                    "- User (login=\"user\" and password=\"user\")."),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], { color: "warning" },
                    "You do not have an account yet?\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { to: "/account/register", className: "alert-link" }, "Register a new account")))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "If you have any question on JHipster:"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "https://www.jhipster.tech/", target: "_blank", rel: "noopener noreferrer" }, "JHipster homepage")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "http://stackoverflow.com/tags/jhipster/info", target: "_blank", rel: "noopener noreferrer" }, "JHipster on Stack Overflow")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "https://github.com/jhipster/generator-jhipster/issues?state=open", target: "_blank", rel: "noopener noreferrer" }, "JHipster bug tracker")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "https://gitter.im/jhipster/generator-jhipster", target: "_blank", rel: "noopener noreferrer" }, "JHipster public chat room")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "https://twitter.com/jhipster", target: "_blank", rel: "noopener noreferrer" }, "follow @jhipster on Twitter"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null,
                "If you like JHipster, do not forget to give us a star on",
                ' ',
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "https://github.com/jhipster/generator-jhipster", target: "_blank", rel: "noopener noreferrer" }, "Github"),
                "!")),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], { md: "3", className: "pad" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "hipster rounded" }))));
};
const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated
});
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps)(Home));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/home/home.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/home/home.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/login/login-modal.tsx":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/modules/login/login-modal.tsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! availity-reactstrap-validation */ "./node_modules/availity-reactstrap-validation/lib/index.js");
/* harmony import */ var availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");




class LoginModal extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.handleSubmit = (event, errors, { username, password, rememberMe }) => {
            const { handleLogin } = this.props;
            handleLogin(username, password, rememberMe);
        };
    }
    render() {
        const { loginError, handleClose } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], { isOpen: this.props.showModal, toggle: handleClose, backdrop: "static", id: "login-page", autoFocus: false },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvForm"], { onSubmit: this.handleSubmit },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalHeader"], { id: "login-title", toggle: handleClose }, "Sign in"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalBody"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null,
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], { md: "12" }, loginError ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Alert"], { color: "danger" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Failed to sign in!"),
                            " Please check your credentials and try again.")) : null),
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], { md: "12" },
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "username", label: "Username", placeholder: "Your username", required: true, errorMessage: "Username cannot be empty!", autoFocus: true }),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvField"], { name: "password", type: "password", label: "Password", placeholder: "Your password", required: true, errorMessage: "Password cannot be empty!" }),
                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvGroup"], { check: true, inline: true },
                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Label"], { className: "form-check-label" },
                                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(availity_reactstrap_validation__WEBPACK_IMPORTED_MODULE_2__["AvInput"], { type: "checkbox", name: "rememberMe" }),
                                    " Remember me")))),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "mt-1" }, "\u00A0"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Alert"], { color: "warning" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "/account/reset/request" }, "Did you forget your password?")),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Alert"], { color: "warning" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "You don't have an account yet?"),
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], { to: "/account/register" }, "Register a new account"))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ModalFooter"], null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], { color: "secondary", onClick: handleClose, tabIndex: "1" }, "Cancel"),
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], { color: "primary", type: "submit" }, "Sign in")))));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (LoginModal);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/login/login-modal.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/login/login-modal.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/login/login.tsx":
/*!*****************************************************!*\
  !*** ./src/main/webapp/app/modules/login/login.tsx ***!
  \*****************************************************/
/*! exports provided: Login, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var _login_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login-modal */ "./src/main/webapp/app/modules/login/login-modal.tsx");





const Login = (props) => {
    const [showModal, setShowModal] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.showModal);
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
        setShowModal(true);
    }, []);
    const handleLogin = (username, password, rememberMe = false) => props.login(username, password, rememberMe);
    const handleClose = () => {
        setShowModal(false);
        props.history.push('/');
    };
    const { location, isAuthenticated } = props;
    const { from } = location.state || { from: { pathname: '/', search: location.search } };
    if (isAuthenticated) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], { to: from });
    }
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_login_modal__WEBPACK_IMPORTED_MODULE_4__["default"], { showModal: showModal, handleLogin: handleLogin, handleClose: handleClose, loginError: props.loginError });
};
const mapStateToProps = ({ authentication }) => ({
    isAuthenticated: authentication.isAuthenticated,
    loginError: authentication.loginError,
    showModal: authentication.showModalLogin
});
const mapDispatchToProps = { login: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_3__["login"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Login));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/login/login.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/login/login.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/modules/login/logout.tsx":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/modules/login/logout.tsx ***!
  \******************************************************/
/*! exports provided: Logout, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logout", function() { return Logout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/shared/reducers/authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");



class Logout extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        const logoutUrl = this.props.logoutUrl;
        if (logoutUrl) {
            // if Keycloak, logoutUrl has protocol/openid-connect in it
            window.location.href = logoutUrl.includes('/protocol')
                ? logoutUrl + '?redirect_uri=' + window.location.origin
                : logoutUrl + '?id_token_hint=' + this.props.idToken + '&post_logout_redirect_uri=' + window.location.origin;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "p-5" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Logged out successfully!")));
    }
}
const mapStateToProps = (storeState) => ({
    logoutUrl: storeState.authentication.logoutUrl,
    idToken: storeState.authentication.idToken
});
const mapDispatchToProps = { logout: app_shared_reducers_authentication__WEBPACK_IMPORTED_MODULE_2__["logout"] };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Logout));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/modules/login/logout.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/modules/login/logout.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/routes.tsx":
/*!****************************************!*\
  !*** ./src/main/webapp/app/routes.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loadable */ "./node_modules/react-loadable/lib/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_modules_login_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/modules/login/login */ "./src/main/webapp/app/modules/login/login.tsx");
/* harmony import */ var app_modules_account_register_register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/modules/account/register/register */ "./src/main/webapp/app/modules/account/register/register.tsx");
/* harmony import */ var app_modules_account_activate_activate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/modules/account/activate/activate */ "./src/main/webapp/app/modules/account/activate/activate.tsx");
/* harmony import */ var app_modules_account_password_reset_init_password_reset_init__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/modules/account/password-reset/init/password-reset-init */ "./src/main/webapp/app/modules/account/password-reset/init/password-reset-init.tsx");
/* harmony import */ var app_modules_account_password_reset_finish_password_reset_finish__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/modules/account/password-reset/finish/password-reset-finish */ "./src/main/webapp/app/modules/account/password-reset/finish/password-reset-finish.tsx");
/* harmony import */ var app_modules_login_logout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/modules/login/logout */ "./src/main/webapp/app/modules/login/logout.tsx");
/* harmony import */ var app_modules_home_home__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/modules/home/home */ "./src/main/webapp/app/modules/home/home.tsx");
/* harmony import */ var app_entities__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/entities */ "./src/main/webapp/app/entities/index.tsx");
/* harmony import */ var app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/shared/auth/private-route */ "./src/main/webapp/app/shared/auth/private-route.tsx");
/* harmony import */ var app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/shared/error/error-boundary-route */ "./src/main/webapp/app/shared/error/error-boundary-route.tsx");
/* harmony import */ var app_shared_error_page_not_found__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/shared/error/page-not-found */ "./src/main/webapp/app/shared/error/page-not-found.tsx");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");















const Account = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
    loader: () => __webpack_require__.e(/*! import() | account */ "account").then(__webpack_require__.bind(null, /*! app/modules/account */ "./src/main/webapp/app/modules/account/index.tsx")),
    loading: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "loading ...")
});
const Admin = react_loadable__WEBPACK_IMPORTED_MODULE_2___default()({
    loader: () => __webpack_require__.e(/*! import() | administration */ "administration").then(__webpack_require__.bind(null, /*! app/modules/administration */ "./src/main/webapp/app/modules/administration/index.tsx")),
    loading: () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "loading ...")
});
const Routes = () => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "view-routes" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/login", component: app_modules_login_login__WEBPACK_IMPORTED_MODULE_3__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/logout", component: app_modules_login_logout__WEBPACK_IMPORTED_MODULE_8__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/account/register", component: app_modules_account_register_register__WEBPACK_IMPORTED_MODULE_4__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/account/activate/:key?", component: app_modules_account_activate_activate__WEBPACK_IMPORTED_MODULE_5__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/account/reset/request", component: app_modules_account_password_reset_init_password_reset_init__WEBPACK_IMPORTED_MODULE_6__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/account/reset/finish/:key?", component: app_modules_account_password_reset_finish_password_reset_finish__WEBPACK_IMPORTED_MODULE_7__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_11__["default"], { path: "/admin", component: Admin, hasAnyAuthorities: [app_config_constants__WEBPACK_IMPORTED_MODULE_14__["AUTHORITIES"].ADMIN] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_11__["default"], { path: "/account", component: Account, hasAnyAuthorities: [app_config_constants__WEBPACK_IMPORTED_MODULE_14__["AUTHORITIES"].ADMIN, app_config_constants__WEBPACK_IMPORTED_MODULE_14__["AUTHORITIES"].USER] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { path: "/", exact: true, component: app_modules_home_home__WEBPACK_IMPORTED_MODULE_9__["default"] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_auth_private_route__WEBPACK_IMPORTED_MODULE_11__["default"], { path: "/", component: app_entities__WEBPACK_IMPORTED_MODULE_10__["default"], hasAnyAuthorities: [app_config_constants__WEBPACK_IMPORTED_MODULE_14__["AUTHORITIES"].USER] }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_error_error_boundary_route__WEBPACK_IMPORTED_MODULE_12__["default"], { component: app_shared_error_page_not_found__WEBPACK_IMPORTED_MODULE_13__["default"] }))));
/* harmony default export */ __webpack_exports__["default"] = (Routes);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/routes.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/routes.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/auth/private-route.tsx":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/shared/auth/private-route.tsx ***!
  \***********************************************************/
/*! exports provided: PrivateRouteComponent, hasAnyAuthority, PrivateRoute, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateRouteComponent", function() { return PrivateRouteComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasAnyAuthority", function() { return hasAnyAuthority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateRoute", function() { return PrivateRoute; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/shared/error/error-boundary */ "./src/main/webapp/app/shared/error/error-boundary.tsx");





const PrivateRouteComponent = (_a) => {
    var { component: Component, isAuthenticated, sessionHasBeenFetched, isAuthorized, hasAnyAuthorities = [] } = _a, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["component", "isAuthenticated", "sessionHasBeenFetched", "isAuthorized", "hasAnyAuthorities"]);
    const checkAuthorities = props => isAuthorized ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_4__["default"], null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, Object.assign({}, props)))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "insufficient-authority" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert alert-danger" }, "You are not authorized to access this page.")));
    const renderRedirect = props => {
        if (!sessionHasBeenFetched) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null);
        }
        else {
            return isAuthenticated ? (checkAuthorities(props)) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], { to: {
                    pathname: '/login',
                    search: props.location.search,
                    state: { from: props.location }
                } }));
        }
    };
    if (!Component)
        throw new Error(`A component needs to be specified for private route for path ${rest.path}`);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Route"], Object.assign({}, rest, { render: renderRedirect }));
};
const hasAnyAuthority = (authorities, hasAnyAuthorities) => {
    if (authorities && authorities.length !== 0) {
        if (hasAnyAuthorities.length === 0) {
            return true;
        }
        return hasAnyAuthorities.some(auth => authorities.includes(auth));
    }
    return false;
};
const mapStateToProps = ({ authentication: { isAuthenticated, account, sessionHasBeenFetched } }, { hasAnyAuthorities = [] }) => ({
    isAuthenticated,
    isAuthorized: hasAnyAuthority(account.authorities, hasAnyAuthorities),
    sessionHasBeenFetched
});
/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
const PrivateRoute = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, null, null, { pure: false })(PrivateRouteComponent);
/* harmony default export */ __webpack_exports__["default"] = (PrivateRoute);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/auth/private-route.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/auth/private-route.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/error/error-boundary-route.tsx":
/*!*******************************************************************!*\
  !*** ./src/main/webapp/app/shared/error/error-boundary-route.tsx ***!
  \*******************************************************************/
/*! exports provided: ErrorBoundaryRoute, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorBoundaryRoute", function() { return ErrorBoundaryRoute; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/error/error-boundary */ "./src/main/webapp/app/shared/error/error-boundary.tsx");




const ErrorBoundaryRoute = (_a) => {
    var { component: Component } = _a, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["component"]);
    const encloseInErrorBoundary = props => (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_shared_error_error_boundary__WEBPACK_IMPORTED_MODULE_3__["default"], null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, Object.assign({}, props))));
    if (!Component)
        throw new Error(`A component needs to be specified for path ${rest.path}`);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], Object.assign({}, rest, { render: encloseInErrorBoundary }));
};
/* harmony default export */ __webpack_exports__["default"] = (ErrorBoundaryRoute);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/error/error-boundary-route.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/error/error-boundary-route.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/error/error-boundary.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/error/error-boundary.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    constructor() {
        super(...arguments);
        this.state = { error: undefined, errorInfo: undefined };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }
    render() {
        const { error, errorInfo } = this.state;
        if (errorInfo) {
            const errorDetails =  true ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("details", { className: "preserve-space" },
                error && error.toString(),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null),
                errorInfo.componentStack)) : (undefined);
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", { className: "error" }, "An unexpected error has occurred."),
                errorDetails));
        }
        return this.props.children;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ErrorBoundary);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/error/error-boundary.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/error/error-boundary.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/error/page-not-found.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/error/page-not-found.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");


class PageNotFound extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Alert"], { color: "danger" }, "The page does not exist.")));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (PageNotFound);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/error/page-not-found.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/error/page-not-found.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/footer/footer.scss":
/*!**************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/footer/footer.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./footer.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/footer/footer.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./footer.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/footer/footer.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./footer.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/footer/footer.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/footer/footer.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/footer/footer.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _footer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.scss */ "./src/main/webapp/app/shared/layout/footer/footer.scss");
/* harmony import */ var _footer_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_footer_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");



const Footer = props => (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "footer page-content" },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], { md: "12" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Your footer")))));
/* harmony default export */ __webpack_exports__["default"] = (Footer);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/footer/footer.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/footer/footer.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/header-components.tsx":
/*!************************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/header-components.tsx ***!
  \************************************************************************/
/*! exports provided: BrandIcon, Brand, Home */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandIcon", function() { return BrandIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Brand", function() { return Brand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var app_config_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/config/constants */ "./src/main/webapp/app/config/constants.ts");





const BrandIcon = props => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", Object.assign({}, props, { className: "brand-icon" }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { src: "content/images/logo-jhipster.png", alt: "Logo" })));
const Brand = props => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["NavbarBrand"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], to: "/", className: "brand-logo" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BrandIcon, null),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "brand-title" }, "Junction"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "navbar-version" }, app_config_constants__WEBPACK_IMPORTED_MODULE_4__["default"].VERSION)));
const Home = props => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["NavItem"], null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["NavLink"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], to: "/", className: "d-flex align-items-center" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], { icon: "home" }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Home"))));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/header/header-components.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/header/header-components.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/header.scss":
/*!**************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/header.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./header.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/header/header.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./header.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/header/header.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./header.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/header/header.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/header/header.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/header/header.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.scss */ "./src/main/webapp/app/shared/layout/header/header.scss");
/* harmony import */ var _header_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_header_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux-loading-bar */ "./node_modules/react-redux-loading-bar/build/index.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _header_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header-components */ "./src/main/webapp/app/shared/layout/header/header-components.tsx");
/* harmony import */ var _menus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../menus */ "./src/main/webapp/app/shared/layout/menus/index.ts");






const Header = (props) => {
    const [menuOpen, setMenuOpen] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
    const renderDevRibbon = () => props.isInProduction === false ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "ribbon dev" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "" }, "Development"))) : null;
    const toggleMenu = () => setMenuOpen(!menuOpen);
    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { id: "app-header" },
        renderDevRibbon(),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_3___default.a, { className: "loading-bar" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Navbar"], { dark: true, expand: "sm", fixed: "top", className: "bg-primary" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["NavbarToggler"], { "aria-label": "Menu", onClick: toggleMenu }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_4__["Brand"], null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Collapse"], { isOpen: menuOpen, navbar: true },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Nav"], { id: "header-tabs", className: "ml-auto", navbar: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_header_components__WEBPACK_IMPORTED_MODULE_4__["Home"], null),
                    props.isAuthenticated && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_menus__WEBPACK_IMPORTED_MODULE_5__["EntitiesMenu"], null),
                    props.isAuthenticated && props.isAdmin && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_menus__WEBPACK_IMPORTED_MODULE_5__["AdminMenu"], { showSwagger: props.isSwaggerEnabled }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_menus__WEBPACK_IMPORTED_MODULE_5__["AccountMenu"], { isAuthenticated: props.isAuthenticated }))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Header);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/header/header.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/header/header.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/menus/account.tsx":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/menus/account.tsx ***!
  \*************************************************************/
/*! exports provided: AccountMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountMenu", function() { return AccountMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/layout/menus/menu-item */ "./src/main/webapp/app/shared/layout/menus/menu-item.tsx");
/* harmony import */ var _menu_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-components */ "./src/main/webapp/app/shared/layout/menus/menu-components.tsx");



const accountMenuItemsAuthenticated = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "wrench", to: "/account/settings" }, "Settings"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "lock", to: "/account/password" }, "Password"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "sign-out-alt", to: "/logout" }, "Sign out")));
const accountMenuItems = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { id: "login-item", icon: "sign-in-alt", to: "/login" }, "Sign in"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "sign-in-alt", to: "/account/register" }, "Register")));
const AccountMenu = ({ isAuthenticated = false }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_menu_components__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"], { icon: "user", name: "Account", id: "account-menu" }, isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems));
/* harmony default export */ __webpack_exports__["default"] = (AccountMenu);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/account.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/account.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/menus/admin.tsx":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/menus/admin.tsx ***!
  \***********************************************************/
/*! exports provided: AdminMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminMenu", function() { return AdminMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/layout/menus/menu-item */ "./src/main/webapp/app/shared/layout/menus/menu-item.tsx");
/* harmony import */ var _menu_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-components */ "./src/main/webapp/app/shared/layout/menus/menu-components.tsx");



const adminMenuItems = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "user", to: "/admin/user-management" }, "User management"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "tachometer-alt", to: "/admin/metrics" }, "Metrics"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "heart", to: "/admin/health" }, "Health"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "list", to: "/admin/configuration" }, "Configuration"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "bell", to: "/admin/audits" }, "Audits"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "tasks", to: "/admin/logs" }, "Logs")));
const swaggerItem = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "book", to: "/admin/docs" }, "API"));
const AdminMenu = ({ showSwagger }) => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_menu_components__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"], { icon: "user-plus", name: "Administration", style: { width: '140%' }, id: "admin-menu" },
    adminMenuItems,
    showSwagger && swaggerItem));
/* harmony default export */ __webpack_exports__["default"] = (AdminMenu);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/admin.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/admin.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/menus/entities.tsx":
/*!**************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/menus/entities.tsx ***!
  \**************************************************************/
/*! exports provided: EntitiesMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntitiesMenu", function() { return EntitiesMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/layout/menus/menu-item */ "./src/main/webapp/app/shared/layout/menus/menu-item.tsx");
/* harmony import */ var _menu_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu-components */ "./src/main/webapp/app/shared/layout/menus/menu-components.tsx");



const EntitiesMenu = props => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_menu_components__WEBPACK_IMPORTED_MODULE_2__["NavDropdown"], { icon: "th-list", name: "Entities", id: "entity-menu" },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "asterisk", to: "/hospital" }, "Hospital"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "asterisk", to: "/diary" }, "Diary"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "asterisk", to: "/therapist" }, "Therapist"),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_shared_layout_menus_menu_item__WEBPACK_IMPORTED_MODULE_1__["default"], { icon: "asterisk", to: "/face-image" }, "Face Image")));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/entities.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/entities.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/menus/index.ts":
/*!**********************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/menus/index.ts ***!
  \**********************************************************/
/*! exports provided: AccountMenu, AdminMenu, EntitiesMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account */ "./src/main/webapp/app/shared/layout/menus/account.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccountMenu", function() { return _account__WEBPACK_IMPORTED_MODULE_0__["AccountMenu"]; });

/* harmony import */ var _admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin */ "./src/main/webapp/app/shared/layout/menus/admin.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdminMenu", function() { return _admin__WEBPACK_IMPORTED_MODULE_1__["AdminMenu"]; });

/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities */ "./src/main/webapp/app/shared/layout/menus/entities.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EntitiesMenu", function() { return _entities__WEBPACK_IMPORTED_MODULE_2__["EntitiesMenu"]; });






; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/index.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/index.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/menus/menu-components.tsx":
/*!*********************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/menus/menu-components.tsx ***!
  \*********************************************************************/
/*! exports provided: NavDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavDropdown", function() { return NavDropdown; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");



const NavDropdown = props => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["UncontrolledDropdown"], { nav: true, inNavbar: true, id: props.id },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownToggle"], { nav: true, caret: true, className: "d-flex align-items-center" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], { icon: props.icon }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, props.name)),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownMenu"], { right: true, style: props.style }, props.children)));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/menu-components.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/menu-components.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/menus/menu-item.tsx":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/menus/menu-item.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");




class MenuItem extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    render() {
        const { to, icon, id, children } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["DropdownItem"], { tag: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], to: to, id: id },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], { icon: icon, fixedWidth: true }),
            " ",
            children));
    }
}


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/menu-item.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/menus/menu-item.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/password/password-strength-bar.scss":
/*!*******************************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/password/password-strength-bar.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./password-strength-bar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/password/password-strength-bar.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./password-strength-bar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/password/password-strength-bar.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/postcss-loader/src!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-3!./password-strength-bar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js?!./src/main/webapp/app/shared/layout/password/password-strength-bar.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx":
/*!******************************************************************************!*\
  !*** ./src/main/webapp/app/shared/layout/password/password-strength-bar.tsx ***!
  \******************************************************************************/
/*! exports provided: PasswordStrengthBar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordStrengthBar", function() { return PasswordStrengthBar; });
/* harmony import */ var _password_strength_bar_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./password-strength-bar.scss */ "./src/main/webapp/app/shared/layout/password/password-strength-bar.scss");
/* harmony import */ var _password_strength_bar_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_password_strength_bar_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const PasswordStrengthBar = ({ password }) => {
    const colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
    const measureStrength = (p) => {
        let force = 0;
        const regex = /[$-/:-?{-~!"^_`[\]]/g;
        const flags = {
            lowerLetters: /[a-z]+/.test(p),
            upperLetters: /[A-Z]+/.test(p),
            numbers: /[0-9]+/.test(p),
            symbols: regex.test(p)
        };
        const passedMatches = Object.values(flags).filter((isMatchedFlag) => !!isMatchedFlag).length;
        force += 2 * p.length + (p.length >= 10 ? 1 : 0);
        force += passedMatches * 10;
        // penalty (short password)
        force = p.length <= 6 ? Math.min(force, 10) : force;
        // penalty (poor variety of characters)
        force = passedMatches === 1 ? Math.min(force, 10) : force;
        force = passedMatches === 2 ? Math.min(force, 20) : force;
        force = passedMatches === 3 ? Math.min(force, 40) : force;
        return force;
    };
    const getColor = (s) => {
        let idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 2;
        }
        else if (s <= 40) {
            idx = 3;
        }
        else {
            idx = 4;
        }
        return { idx: idx + 1, col: colors[idx] };
    };
    const getPoints = force => {
        const pts = [];
        for (let i = 0; i < 5; i++) {
            pts.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { key: i, className: "point", style: i < force.idx ? { backgroundColor: force.col } : { backgroundColor: '#DDD' } }));
        }
        return pts;
    };
    const strength = getColor(measureStrength(password));
    const points = getPoints(strength);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { id: "strength" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("small", null, "Password strength:"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { id: "strengthBar" }, points)));
};
/* harmony default export */ __webpack_exports__["default"] = (PasswordStrengthBar);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/password/password-strength-bar.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/layout/password/password-strength-bar.tsx"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/model/diary.model.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/diary.model.ts ***!
  \*********************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
const defaultValue = {};


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/diary.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/diary.model.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/model/face-image.model.ts":
/*!**************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/face-image.model.ts ***!
  \**************************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
const defaultValue = {};


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/face-image.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/face-image.model.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/model/hospital.model.ts":
/*!************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/hospital.model.ts ***!
  \************************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
const defaultValue = {};


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/hospital.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/hospital.model.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/model/therapist.model.ts":
/*!*************************************************************!*\
  !*** ./src/main/webapp/app/shared/model/therapist.model.ts ***!
  \*************************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
const defaultValue = {};


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/therapist.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/therapist.model.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/model/user.model.ts":
/*!********************************************************!*\
  !*** ./src/main/webapp/app/shared/model/user.model.ts ***!
  \********************************************************/
/*! exports provided: defaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValue", function() { return defaultValue; });
const defaultValue = {
    id: '',
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    activated: false,
    langKey: '',
    authorities: [],
    createdBy: '',
    createdDate: null,
    lastModifiedBy: '',
    lastModifiedDate: null,
    password: ''
};


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/user.model.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/model/user.model.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/action-type.util.ts":
/*!*****************************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/action-type.util.ts ***!
  \*****************************************************************/
/*! exports provided: REQUEST, SUCCESS, FAILURE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST", function() { return REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUCCESS", function() { return SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FAILURE", function() { return FAILURE; });
/**
 * Appends REQUEST async action type
 */
const REQUEST = actionType => `${actionType}_PENDING`;
/**
 * Appends SUCCESS async action type
 */
const SUCCESS = actionType => `${actionType}_FULFILLED`;
/**
 * Appends FAILURE async action type
 */
const FAILURE = actionType => `${actionType}_REJECTED`;


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/reducers/action-type.util.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/reducers/action-type.util.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/application-profile.ts":
/*!********************************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/application-profile.ts ***!
  \********************************************************************/
/*! exports provided: ACTION_TYPES, default, getProfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfile", function() { return getProfile; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");


const ACTION_TYPES = {
    GET_PROFILE: 'applicationProfile/GET_PROFILE'
};
const initialState = {
    ribbonEnv: '',
    inProduction: true,
    isSwaggerEnabled: false
};
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"])(ACTION_TYPES.GET_PROFILE): {
            const { data } = action.payload;
            return Object.assign({}, state, { ribbonEnv: data['display-ribbon-on-profiles'], inProduction: data.activeProfiles.includes('prod'), isSwaggerEnabled: data.activeProfiles.includes('swagger') });
        }
        default:
            return state;
    }
});
const getProfile = () => ({
    type: ACTION_TYPES.GET_PROFILE,
    payload: axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('management/info')
});


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/reducers/application-profile.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/reducers/application-profile.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/authentication.ts":
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/authentication.ts ***!
  \***************************************************************/
/*! exports provided: ACTION_TYPES, default, displayAuthError, getSession, login, clearAuthToken, logout, clearAuthentication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTION_TYPES", function() { return ACTION_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayAuthError", function() { return displayAuthError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSession", function() { return getSession; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAuthToken", function() { return clearAuthToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAuthentication", function() { return clearAuthentication; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jhipster */ "./node_modules/react-jhipster/lib/index.js");
/* harmony import */ var react_jhipster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jhipster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/shared/reducers/action-type.util */ "./src/main/webapp/app/shared/reducers/action-type.util.ts");




const ACTION_TYPES = {
    LOGIN: 'authentication/LOGIN',
    GET_SESSION: 'authentication/GET_SESSION',
    LOGOUT: 'authentication/LOGOUT',
    CLEAR_AUTH: 'authentication/CLEAR_AUTH',
    ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};
const AUTH_TOKEN_KEY = 'jhi-authenticationToken';
const initialState = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false,
    showModalLogin: false,
    account: {},
    errorMessage: null,
    redirectMessage: null,
    sessionHasBeenFetched: false,
    idToken: null,
    logoutUrl: null
};
// Reducer
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
    switch (action.type) {
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.LOGIN):
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["REQUEST"])(ACTION_TYPES.GET_SESSION):
            return Object.assign({}, state, { loading: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.LOGIN):
            return Object.assign({}, initialState, { errorMessage: action.payload, showModalLogin: true, loginError: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["FAILURE"])(ACTION_TYPES.GET_SESSION):
            return Object.assign({}, state, { loading: false, isAuthenticated: false, sessionHasBeenFetched: true, showModalLogin: true, errorMessage: action.payload });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.LOGIN):
            return Object.assign({}, state, { loading: false, loginError: false, showModalLogin: false, loginSuccess: true });
        case ACTION_TYPES.LOGOUT:
            return Object.assign({}, initialState, { showModalLogin: true });
        case Object(app_shared_reducers_action_type_util__WEBPACK_IMPORTED_MODULE_3__["SUCCESS"])(ACTION_TYPES.GET_SESSION): {
            const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
            return Object.assign({}, state, { isAuthenticated, loading: false, sessionHasBeenFetched: true, account: action.payload.data });
        }
        case ACTION_TYPES.ERROR_MESSAGE:
            return Object.assign({}, initialState, { showModalLogin: true, redirectMessage: action.message });
        case ACTION_TYPES.CLEAR_AUTH:
            return Object.assign({}, state, { loading: false, showModalLogin: true, isAuthenticated: false });
        default:
            return state;
    }
});
const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });
const getSession = () => (dispatch, getState) => {
    dispatch({
        type: ACTION_TYPES.GET_SESSION,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('api/account')
    });
};
const login = (username, password, rememberMe = false) => (dispatch, getState) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](undefined, void 0, void 0, function* () {
    const result = yield dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('api/authenticate', { username, password, rememberMe })
    });
    const bearerToken = result.value.headers.authorization;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        if (rememberMe) {
            react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].local.set(AUTH_TOKEN_KEY, jwt);
        }
        else {
            react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.set(AUTH_TOKEN_KEY, jwt);
        }
    }
    yield dispatch(getSession());
});
const clearAuthToken = () => {
    if (react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].local.get(AUTH_TOKEN_KEY)) {
        react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].local.remove(AUTH_TOKEN_KEY);
    }
    if (react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.get(AUTH_TOKEN_KEY)) {
        react_jhipster__WEBPACK_IMPORTED_MODULE_2__["Storage"].session.remove(AUTH_TOKEN_KEY);
    }
};
const logout = () => dispatch => {
    clearAuthToken();
    dispatch({
        type: ACTION_TYPES.LOGOUT
    });
};
const clearAuthentication = messageKey => (dispatch, getState) => {
    clearAuthToken();
    dispatch(displayAuthError(messageKey));
    dispatch({
        type: ACTION_TYPES.CLEAR_AUTH
    });
};


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/reducers/authentication.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/reducers/authentication.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/reducers/index.ts":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/shared/reducers/index.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux-loading-bar */ "./node_modules/react-redux-loading-bar/build/index.js");
/* harmony import */ var react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authentication */ "./src/main/webapp/app/shared/reducers/authentication.ts");
/* harmony import */ var _application_profile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./application-profile */ "./src/main/webapp/app/shared/reducers/application-profile.ts");
/* harmony import */ var app_modules_administration_administration_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/modules/administration/administration.reducer */ "./src/main/webapp/app/modules/administration/administration.reducer.ts");
/* harmony import */ var app_modules_administration_user_management_user_management_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/modules/administration/user-management/user-management.reducer */ "./src/main/webapp/app/modules/administration/user-management/user-management.reducer.ts");
/* harmony import */ var app_modules_account_register_register_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/modules/account/register/register.reducer */ "./src/main/webapp/app/modules/account/register/register.reducer.ts");
/* harmony import */ var app_modules_account_activate_activate_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/modules/account/activate/activate.reducer */ "./src/main/webapp/app/modules/account/activate/activate.reducer.ts");
/* harmony import */ var app_modules_account_password_password_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/modules/account/password/password.reducer */ "./src/main/webapp/app/modules/account/password/password.reducer.ts");
/* harmony import */ var app_modules_account_settings_settings_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/modules/account/settings/settings.reducer */ "./src/main/webapp/app/modules/account/settings/settings.reducer.ts");
/* harmony import */ var app_modules_account_password_reset_password_reset_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/modules/account/password-reset/password-reset.reducer */ "./src/main/webapp/app/modules/account/password-reset/password-reset.reducer.ts");
/* harmony import */ var app_entities_hospital_hospital_reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/entities/hospital/hospital.reducer */ "./src/main/webapp/app/entities/hospital/hospital.reducer.ts");
/* harmony import */ var app_entities_diary_diary_reducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/entities/diary/diary.reducer */ "./src/main/webapp/app/entities/diary/diary.reducer.ts");
/* harmony import */ var app_entities_therapist_therapist_reducer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/entities/therapist/therapist.reducer */ "./src/main/webapp/app/entities/therapist/therapist.reducer.ts");
/* harmony import */ var app_entities_face_image_face_image_reducer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/entities/face-image/face-image.reducer */ "./src/main/webapp/app/entities/face-image/face-image.reducer.ts");











// prettier-ignore

// prettier-ignore

// prettier-ignore

// prettier-ignore

const rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
    authentication: _authentication__WEBPACK_IMPORTED_MODULE_2__["default"],
    applicationProfile: _application_profile__WEBPACK_IMPORTED_MODULE_3__["default"],
    administration: app_modules_administration_administration_reducer__WEBPACK_IMPORTED_MODULE_4__["default"],
    userManagement: app_modules_administration_user_management_user_management_reducer__WEBPACK_IMPORTED_MODULE_5__["default"],
    register: app_modules_account_register_register_reducer__WEBPACK_IMPORTED_MODULE_6__["default"],
    activate: app_modules_account_activate_activate_reducer__WEBPACK_IMPORTED_MODULE_7__["default"],
    passwordReset: app_modules_account_password_reset_password_reset_reducer__WEBPACK_IMPORTED_MODULE_10__["default"],
    password: app_modules_account_password_password_reducer__WEBPACK_IMPORTED_MODULE_8__["default"],
    settings: app_modules_account_settings_settings_reducer__WEBPACK_IMPORTED_MODULE_9__["default"],
    hospital: app_entities_hospital_hospital_reducer__WEBPACK_IMPORTED_MODULE_11__["default"],
    diary: app_entities_diary_diary_reducer__WEBPACK_IMPORTED_MODULE_12__["default"],
    therapist: app_entities_therapist_therapist_reducer__WEBPACK_IMPORTED_MODULE_13__["default"],
    faceImage: app_entities_face_image_face_image_reducer__WEBPACK_IMPORTED_MODULE_14__["default"],
    /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
    loadingBar: react_redux_loading_bar__WEBPACK_IMPORTED_MODULE_1__["loadingBarReducer"]
});
/* harmony default export */ __webpack_exports__["default"] = (rootReducer);


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/reducers/index.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/reducers/index.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/app/shared/util/entity-utils.ts":
/*!*********************************************************!*\
  !*** ./src/main/webapp/app/shared/util/entity-utils.ts ***!
  \*********************************************************/
/*! exports provided: cleanEntity, mapIdList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanEntity", function() { return cleanEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapIdList", function() { return mapIdList; });
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/pick */ "./node_modules/lodash/pick.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with relationship fields with empty an empty id and thus
 * resulting in a 500.
 *
 * @param entity Object to clean.
 */
const cleanEntity = entity => {
    const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));
    return lodash_pick__WEBPACK_IMPORTED_MODULE_0___default()(entity, keysToKeep);
};
/**
 * Simply map a list of element to a list a object with the element as id.
 *
 * @param idList Elements to map.
 * @returns The list of objects with mapped ids.
 */
const mapIdList = (idList) => idList.filter((entityId) => entityId !== '').map((entityId) => ({ id: entityId }));


; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/hien/Documents/junction/src/main/webapp/app/shared/util/entity-utils.ts"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/hien/Documents/junction/src/main/webapp/app/shared/util/entity-utils.ts"); } })(); 

/***/ }),

/***/ "./src/main/webapp/content/images/jhipster_family_member_0.svg":
/*!*********************************************************************!*\
  !*** ./src/main/webapp/content/images/jhipster_family_member_0.svg ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "content/fc8bbf677d4bc9aa695128e317826c11.svg";

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./src/main/webapp/app/index ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/main/webapp/app/index */"./src/main/webapp/app/index.tsx");


/***/ }),

/***/ 1:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!********************************!*\
  !*** supports-color (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!***********************!*\
  !*** chalk (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map