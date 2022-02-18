(self.webpackChunkpixelfed=self.webpackChunkpixelfed||[]).push([[33],{98379:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>l});var i=o(82364);function n(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);"Object"===o&&t.constructor&&(o=t.constructor.name);if("Map"===o||"Set"===o)return Array.from(t);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return s(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,i=new Array(e);o<e;o++)i[o]=t[o];return i}Vue.use(i.default);const l={props:["collection-id","collection-title","collection-description","collection-visibility","profile-id","profile-username"],data:function(){return{collection:{},config:window.App.config,loaded:!1,posts:[],ids:[],currentUser:!1,owner:!1,title:this.collectionTitle,description:this.collectionDescription,visibility:this.collectionVisibility,photoId:"",postsList:[],loadingPostList:!1,addingPostToCollection:!1,markedForDeletion:[]}},beforeMount:function(){this.fetchCollection()},mounted:function(){},methods:{fetchCollection:function(){var t=this;axios.get("/api/local/collection/"+this.collectionId).then((function(e){t.collection=e.data,t.fetchCurrentUser()}))},fetchCurrentUser:function(){var t=this;1==document.querySelectorAll("body")[0].classList.contains("loggedIn")?axios.get("/api/pixelfed/v1/accounts/verify_credentials").then((function(e){t.currentUser=e.data,t.owner=t.currentUser.id==t.profileId,window._sharedData.curUser=e.data,window.App.util.navatar(),t.fetchItems()})):this.fetchItems()},fetchItems:function(){var t=this;axios.get("/api/local/collection/items/"+this.collectionId).then((function(e){t.posts=e.data,t.ids=t.posts.map((function(t){return t.id})),t.loaded=!0}))},previewUrl:function(t){return t.sensitive?"/storage/no-preview.png?v="+(new Date).getTime():t.media_attachments[0].preview_url},previewBackground:function(t){return"background-image: url("+this.previewUrl(t)+");"},addToCollection:function(){var t=this;this.loadingPostList=!0,0==this.postsList.length?axios.get("/api/pixelfed/v1/accounts/"+this.profileId+"/statuses",{params:{min_id:1,limit:13}}).then((function(e){t.postsList=e.data.filter((function(e){return-1==t.ids.indexOf(e.id)})).splice(0,9),t.loadingPostList=!1,t.$refs.addPhotoModal.show()})).catch((function(e){t.loadingPostList=!1,swal("An Error Occured","We cannot process your request at this time, please try again later.","error")})):(this.$refs.addPhotoModal.show(),this.loadingPostList=!1)},pushId:function(){var t=this,e=this.config.uploader.max_collection_length,o=this;if(this.posts.length>=e)swal("Error","You can only add "+e+" posts per collection","error");else{var i=this.photoId,s=window.location.origin,l=i.split("/");i.slice(0,s.length)!==s&&(swal("Invalid URL","You can only add posts from this instance","error"),this.photoId=""),i.slice(0,s.length+3)===s+"/p/"&&6===l.length||(swal("Invalid URL","Invalid URL","error"),this.photoId=""),axios.post("/api/local/collection/item",{collection_id:this.collectionId,post_id:l[5]}).then((function(t){var e;(e=o.ids).push.apply(e,n(l[5]))})).catch((function(e){swal("Invalid URL","The post you entered was invalid","error"),t.photoId=""})),o.$refs.addPhotoModal.hide(),window.location.reload()}},editCollection:function(){this.$refs.editModal.show()},deleteCollection:function(){0!=this.owner&&(window.confirm("Are you sure you want to delete this collection?")&&axios.delete("/api/local/collection/"+this.collectionId).then((function(t){window.location.href="/"})))},publishCollection:function(){0!=this.owner&&(window.confirm("Are you sure you want to publish this collection?")&&axios.post("/api/local/collection/"+this.collectionId+"/publish",{title:this.title,description:this.description,visibility:this.visibility}).then((function(t){window.location.href="/"})))},updateCollection:function(){this.$refs.editModal.hide(),axios.post("/api/local/collection/"+this.collectionId,{title:this.title,description:this.description,visibility:this.visibility}).then((function(t){console.log(t.data)}))},showEditPhotosModal:function(){this.$refs.editModal.hide(),this.$refs.editPhotosModal.show()},markPhotoForDeletion:function(t){-1==this.markedForDeletion.indexOf(t)?this.markedForDeletion.push(t):this.markedForDeletion=this.markedForDeletion.filter((function(e){return e!=t}))},confirmDeletion:function(){var t=this,e=this;window.confirm("Are you sure you want to delete this?")&&(this.markedForDeletion.forEach((function(o){axios.delete("/api/local/collection/item",{params:{collection_id:e.collectionId,post_id:o}}).then((function(i){e.removeItem(o),t.$refs.editPhotosModal.hide()})).catch((function(t){swal("Oops!","An error occured with your request, please try again later.","error")}))})),this.markedForDeletion=[])},removeItem:function(t){this.posts=this.posts.filter((function(e){return e.id!=t}))},addRecentId:function(t){var e=this;axios.post("/api/local/collection/item",{collection_id:this.collectionId,post_id:t.id}).then((function(t){window.location.reload()})).catch((function(t){swal("Oops!","An error occured, please try selecting another post.","error"),e.photoId=""}))}}}},55386:(t,e,o)=>{Vue.component("collection-component",o(44051).default)},77334:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>s});var i=o(23645),n=o.n(i)()((function(t){return t[1]}));n.push([t.id,".dims[data-v-fff8063a]{background:rgba(0,0,0,.68);bottom:0;left:0;position:absolute;right:0;top:0;z-index:300}.scrollbar-hidden[data-v-fff8063a]::-webkit-scrollbar{display:none}.delete-border[data-v-fff8063a]{border:4px solid red}.delete-border .square-content[data-v-fff8063a]{background-blend-mode:screen;background-color:red}",""]);const s=n},88069:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>r});var i=o(93379),n=o.n(i),s=o(77334),l={insert:"head",singleton:!1};n()(s.default,l);const r=s.default.locals||{}},44051:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>l});var i=o(82270),n=o(33195),s={};for(const t in n)"default"!==t&&(s[t]=()=>n[t]);o.d(e,s);o(35763);const l=(0,o(51900).default)(n.default,i.render,i.staticRenderFns,!1,null,"fff8063a",null).exports},33195:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>s});var i=o(98379),n={};for(const t in i)"default"!==t&&(n[t]=()=>i[t]);o.d(e,n);const s=i.default},35763:(t,e,o)=>{"use strict";o.r(e);var i=o(88069),n={};for(const t in i)"default"!==t&&(n[t]=()=>i[t]);o.d(e,n)},82270:(t,e,o)=>{"use strict";o.r(e);var i=o(99111),n={};for(const t in i)"default"!==t&&(n[t]=()=>i[t]);o.d(e,n)},99111:(t,e,o)=>{"use strict";o.r(e),o.d(e,{render:()=>i,staticRenderFns:()=>n});var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"w-100 h-100"},[t.loaded?t._e():o("div",{staticClass:"d-flex justify-content-center align-items-center",staticStyle:{height:"80vh"}},[o("img",{attrs:{src:"/img/pixelfed-icon-grey.svg"}})]),t._v(" "),t.loaded?o("div",{staticClass:"row mt-3"},[o("div",{staticClass:"col-12 p-0 mb-3"},[o("picture",{staticClass:"d-flex align-items-center justify-content-center"},[o("div",{staticClass:"dims"}),t._v(" "),o("div",{staticClass:"text-white",staticStyle:{"z-index":"500",position:"absolute"}},[o("p",{staticClass:"display-4 text-center pt-3"},[t._v(t._s(t.title||"Untitled Collection"))]),t._v(" "),o("p",{staticClass:"lead text-center mb-3"},[t._v(t._s(t.description))]),t._v(" "),o("p",{staticClass:"text-center"},[t._v("\n\t\t\t\t\t\t"+t._s(t.posts.length)+" photos · by "),o("a",{staticClass:"font-weight-bold text-white",attrs:{href:"/"+t.profileUsername}},[t._v(t._s(t.profileUsername))])]),t._v(" "),1==t.owner?o("p",{staticClass:"pt-3 text-center"},[o("span",[o("button",{staticClass:"btn btn-outline-light btn-sm",attrs:{onclick:"this.blur();"},on:{click:function(e){return e.preventDefault(),t.addToCollection.apply(null,arguments)}}},[0==t.loadingPostList?o("span",[t._v("Add Photo")]):o("span",{staticClass:"px-4"},[t._m(0)])]),t._v("\n\t\t\t\t\t\t\t     \n\t\t\t\t\t\t\t"),o("button",{staticClass:"btn btn-outline-light btn-sm",attrs:{onclick:"this.blur();"},on:{click:function(e){return e.preventDefault(),t.editCollection.apply(null,arguments)}}},[t._v("Edit")]),t._v("\n\t\t\t\t\t\t\t     \n\t\t\t\t\t\t\t"),o("button",{staticClass:"btn btn-outline-light btn-sm",on:{click:function(e){return e.preventDefault(),t.deleteCollection.apply(null,arguments)}}},[t._v("Delete")])])]):t._e()]),t._v(" "),o("img",{staticStyle:{width:"100%",height:"600px","object-fit":"cover"},attrs:{src:t.previewUrl(t.posts[0]),alt:""}})])]),t._v(" "),o("div",{staticClass:"col-12 p-0"},[o("masonry",{attrs:{cols:{default:2,700:2,400:1},gutter:{default:"5px"}}},t._l(t.posts,(function(e,i){return o("div",[o("a",{staticClass:"card info-overlay card-md-border-0 mb-1",attrs:{href:e.url}},[o("img",{staticClass:"img-fluid w-100",attrs:{src:t.previewUrl(e)}})])])})),0)],1)]):t._e(),t._v(" "),o("b-modal",{ref:"editModal",attrs:{id:"edit-modal","hide-footer":"",centered:"",title:"Edit Collection","body-class":""}},[o("form",[o("div",{staticClass:"form-group"},[o("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"title"}},[t._v("Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control",attrs:{type:"text",id:"title",placeholder:"Untitled Collection"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"description"}},[t._v("Description")]),t._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{id:"description",placeholder:"Add a description here ...",rows:"3"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-group"},[o("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"visibility"}},[t._v("Visibility")]),t._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:t.visibility,expression:"visibility"}],staticClass:"custom-select",on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.visibility=e.target.multiple?o:o[0]}}},[o("option",{attrs:{value:"public"}},[t._v("Public")]),t._v(" "),o("option",{attrs:{value:"private"}},[t._v("Followers Only")])])]),t._v(" "),o("div",{staticClass:"d-flex justify-content-between align-items-center pt-3"},[o("a",{staticClass:"text-primary font-weight-bold text-decoration-none",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.showEditPhotosModal.apply(null,arguments)}}},[t._v("\n\t\t\t\t\tEdit Photos\n\t\t\t\t")]),t._v(" "),t.collection.published_at?o("div",[o("button",{staticClass:"btn btn-primary btn-sm py-1 font-weight-bold px-3 float-right",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.updateCollection.apply(null,arguments)}}},[t._v("\n\t\t\t\t\t\tSave\n\t\t\t\t\t")])]):o("div",{staticClass:"float-right"},[o("button",{staticClass:"btn btn-outline-primary btn-sm py-1 font-weight-bold px-3",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.publishCollection.apply(null,arguments)}}},[t._v("\n\t\t\t\t\t\tPublish\n\t\t\t\t\t")]),t._v(" "),o("button",{staticClass:"btn btn-primary btn-sm py-1 font-weight-bold px-3",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.updateCollection.apply(null,arguments)}}},[t._v("\n\t\t\t\t\t\tSave\n\t\t\t\t\t")])])])])]),t._v(" "),o("b-modal",{ref:"addPhotoModal",attrs:{id:"add-photo-modal","hide-footer":"",centered:"",title:"Add Photo","body-class":"m-3"}},[o("div",{staticClass:"form-group"},[o("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"title"}},[t._v("Add Recent Post")]),t._v(" "),t.postsList.length>0?o("div",{staticClass:"row m-1"},[t._l(t.postsList,(function(e,i){return o("div",{key:"postList-"+i,staticClass:"col-4 p-1 cursor-pointer",on:{click:function(o){return t.addRecentId(e)}}},[o("div",{staticClass:"square"},[o("div",{staticClass:"square-content",style:"background-image: url("+e.media_attachments[0].url+");"})])])})),t._v(" "),o("div",{staticClass:"col-12"},[o("hr")])],2):t._e()]),t._v(" "),o("form",[o("div",{staticClass:"form-group"},[o("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"title"}},[t._v("Add Post by URL")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.photoId,expression:"photoId"}],staticClass:"form-control",attrs:{type:"text",placeholder:"https://pixelfed.dev/p/admin/1"},domProps:{value:t.photoId},on:{input:function(e){e.target.composing||(t.photoId=e.target.value)}}}),t._v(" "),o("p",{staticClass:"help-text small text-muted"},[t._v("Only local, public posts can be added")])]),t._v(" "),o("button",{staticClass:"btn btn-primary btn-sm py-1 font-weight-bold px-3 float-right",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.pushId.apply(null,arguments)}}},[t.addingPostToCollection?o("span",{staticClass:"px-4"},[o("div",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status"}},[o("span",{staticClass:"sr-only"},[t._v("Loading...")])])]):o("span",[t._v("\n\t\t\t\t\tAdd Photo\n\t\t\t\t")])])])]),t._v(" "),o("b-modal",{ref:"editPhotosModal",attrs:{id:"edit-photos-modal","hide-footer":"",centered:"",title:"Edit Collection Photos","body-class":"m-3"}},[o("div",{staticClass:"form-group"},[o("p",{staticClass:"font-weight-bold text-dark text-center"},[t._v("Select a Photo to Delete")]),t._v(" "),t.posts.length>0?o("div",{staticClass:"row m-1 scrollbar-hidden",staticStyle:{"max-height":"350px","overflow-y":"auto"}},t._l(t.posts,(function(e,i){return o("div",{key:"plm-"+i,staticClass:"col-4 p-1 cursor-pointer"},[o("div",{class:[-1==t.markedForDeletion.indexOf(e.id)?"square":"square  delete-border"],on:{click:function(o){return t.markPhotoForDeletion(e.id)}}},[o("div",{staticClass:"square-content",style:"background-image: url("+e.media_attachments[0].url+");"})])])})),0):t._e(),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.markedForDeletion.length>0,expression:"markedForDeletion.length > 0"}]},[o("button",{staticClass:"btn btn-primary font-weight-bold py-0 btn-block mb-0 mt-4",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.confirmDeletion.apply(null,arguments)}}},[t._v("Delete "+t._s(t.markedForDeletion.length)+" "+t._s(1==t.markedForDeletion.length?"photo":"photos"))])])])])],1)},n=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status"}},[o("span",{staticClass:"sr-only"},[t._v("Loading...")])])}]}},t=>{t.O(0,[898],(()=>{return e=55386,t(t.s=e);var e}));t.O()}]);