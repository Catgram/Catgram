"use strict";(self.webpackChunkpixelfed=self.webpackChunkpixelfed||[]).push([[286],{63744:(t,e,a)=>{a.r(e),a.d(e,{default:()=>m});var i=a(42755),s=a(88231),o=a(33795),n=a(78423),r=a(22583),l=a(64491),d=a(19755);function c(t){return function(t){if(Array.isArray(t))return p(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return p(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,i=new Array(e);a<e;a++)i[a]=t[a];return i}const m={props:["accountId"],components:{drawer:i.default,sidebar:s.default,intersect:n.default,"dm-placeholder":o.default,"profile-card":r.default,message:l.default},data:function(){return{isLoaded:!1,profile:void 0,conversationProfile:void 0,isIntersecting:!1,config:window.App.config,hideAvatars:!0,hideTimestamps:!1,largerText:!1,autoRefresh:!1,mutedNotifications:!1,blocked:!1,loaded:!1,page:"read",pages:["browse","add","read"],threads:[],thread:!1,threadIndex:!1,replyText:"",composeUsername:"",uploading:!1,uploadProgress:null,min_id:null,max_id:null,loadingMessages:!1,showLoadMore:!0,showReplyLong:!1,showReplyTooLong:!1,showPrivacyWarning:!0}},mounted:function(){var t=this;this.profile=window._sharedData.user,this.isLoaded=!0;var e=this;axios.get("/api/v1/accounts/"+this.accountId).then((function(e){t.conversationProfile=e.data})),axios.get("/api/direct/thread",{params:{pid:e.accountId}}).then((function(a){e.loaded=!0;var i=a.data;t.thread=i,t.threads=[i],t.threadIndex=0;var s=i.messages.map((function(t){return t.id}));t.max_id=Math.max.apply(Math,c(s)),t.min_id=Math.min.apply(Math,c(s)),t.mutedNotifications=i.muted,t.markAsRead()}));var a=localStorage.getItem("px_dm_options");a&&(a=JSON.parse(a),this.hideAvatars=a.hideAvatars,this.hideTimestamps=a.hideTimestamps,this.largerText=a.largerText)},computed:{showDMPrivacyWarning:{get:function(){return this.$store.state.showDMPrivacyWarning},set:function(t){window.localStorage.removeItem("pf_m2s.dmwarncounter"),this.$store.commit("setShowDMPrivacyWarning",t)}}},watch:{mutedNotifications:function(t){t?axios.post("/api/direct/mute",{id:this.accountId}).then((function(t){})):axios.post("/api/direct/unmute",{id:this.accountId}).then((function(t){})),this.mutedNotifications=t},hideAvatars:function(t){this.hideAvatars=t,this.updateOptions()},hideTimestamps:function(t){this.hideTimestamps=t,this.updateOptions()},largerText:function(t){this.largerText=t,this.updateOptions()},replyText:function(t){return t.length<500&&(this.showReplyLong=!1,this.showReplyTooLong=!1),t.length>500?(this.showReplyLong=!1,void(this.showReplyTooLong=!0)):t.length>450?(this.showReplyTooLong=!1,void(this.showReplyLong=!0)):void 0}},methods:{sendMessage:function(){var t=this,e=this,a=this.replyText;axios.post("/api/direct/create",{to_id:this.threads[this.threadIndex].id,message:a,type:e.isEmoji(a)&&a.length<10?"emoji":"text"}).then((function(a){var i=a.data;e.threads[e.threadIndex].messages.unshift(i);var s=e.threads[e.threadIndex].messages.map((function(t){return t.id}));t.max_id=Math.max.apply(Math,c(s)),t.min_id=Math.min.apply(Math,c(s))})).catch((function(t){403==t.response.status&&(e.blocked=!0,swal("Profile Unavailable","You cannot message this profile at this time.","error"))})),this.replyText=""},truncate:function(t){return _.truncate(t)},deleteMessage:function(t){var e=this;window.confirm("Are you sure you want to delete this message?")&&axios.delete("/api/direct/message",{params:{id:this.thread.messages[t].reportId}}).then((function(a){e.thread.messages.splice(t,1)}))},reportMessage:function(){this.closeCtxMenu();var t="/i/report?type=post&id="+this.ctxContext.reportId;window.location.href=t},uploadMedia:function(t){var e=this;d(document).on("change","#uploadMedia",(function(t){e.handleUpload()}));var a=d(t.target);a.attr("disabled",""),d("#uploadMedia").click(),a.blur(),a.removeAttr("disabled")},handleUpload:function(){var t=this;if(!t.uploading){t.uploading=!0;var e=document.querySelector("#uploadMedia");e.files.length||(this.uploading=!1),Array.prototype.forEach.call(e.files,(function(e,a){var i=e.type,s=t.config.uploader.media_types.split(",");if(-1==d.inArray(i,s))return swal("Invalid File Type","The file you are trying to add is not a valid mime type. Please upload a "+t.config.uploader.media_types+" only.","error"),void(t.uploading=!1);var o=new FormData;o.append("file",e),o.append("to_id",t.threads[t.threadIndex].id);var n={onUploadProgress:function(e){var a=Math.round(100*e.loaded/e.total);t.uploadProgress=a}};axios.post("/api/direct/media",o,n).then((function(e){t.uploadProgress=100,t.uploading=!1;var a={id:e.data.id,type:e.data.type,reportId:e.data.reportId,isAuthor:!0,text:null,media:e.data.url,timeAgo:"1s",seen:null};t.threads[t.threadIndex].messages.unshift(a)})).catch((function(a){if(a.hasOwnProperty("response")&&a.response.hasOwnProperty("status"))if(451===a.response.status)t.uploading=!1,e.value=null,swal("Banned Content","This content has been banned and cannot be uploaded.","error");else t.uploading=!1,e.value=null,swal("Oops, something went wrong!","An unexpected error occurred.","error")})),e.value=null,t.uploadProgress=0}))}},viewOriginal:function(){var t=this.ctxContext.media;window.location.href=t},isEmoji:function(t){var e=t.replace(new RegExp("[\0-ữf]","g"),""),a=t.replace(new RegExp("[\n\rs]+|( )+","g"),"");return e.length===a.length},copyText:function(){window.App.util.clipboard(this.ctxContext.text),this.closeCtxMenu()},clickLink:function(){var t=this.ctxContext.text;1!=this.ctxContext.meta.local&&(t="/i/redirect?url="+encodeURI(this.ctxContext.text)),window.location.href=t},markAsRead:function(){},loadOlderMessages:function(){var t=this,e=this;this.loadingMessages=!0,axios.get("/api/direct/thread",{params:{pid:this.accountId,max_id:this.min_id}}).then((function(a){var i,s=a.data;if(!s.messages.length)return t.showLoadMore=!1,void(t.loadingMessages=!1);var o=t.thread.messages.map((function(t){return t.id})),n=s.messages.filter((function(t){return-1==o.indexOf(t.id)})).reverse(),r=n.map((function(t){return t.id})),l=Math.min.apply(Math,c(r));if(l==t.min_id)return t.showLoadMore=!1,void(t.loadingMessages=!1);t.min_id=l,(i=t.thread.messages).push.apply(i,c(n)),setTimeout((function(){e.loadingMessages=!1}),500)})).catch((function(e){t.loadingMessages=!1}))},messagePoll:function(){var t=this;setInterval((function(){axios.get("/api/direct/thread",{params:{pid:t.accountId,min_id:t.thread.messages[t.thread.messages.length-1].id}}).then((function(t){}))}),5e3)},showOptions:function(){this.page="options"},updateOptions:function(){var t={v:1,hideAvatars:this.hideAvatars,hideTimestamps:this.hideTimestamps,largerText:this.largerText};window.localStorage.setItem("px_dm_options",JSON.stringify(t))},formatCount:function(t){return window.App.util.format.count(t)},goBack:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t?this.page=t:this.$router.push("/i/web/direct")},gotoProfile:function(t){this.$router.push("/i/web/profile/".concat(t.id))},togglePrivacyWarning:function(){console.log("clicked toggle privacy warning");var t=window.localStorage,e="pf_m2s.dmwarncounter";if(this.showPrivacyWarning=!1,t.getItem(e)){var a=t.getItem(e);a++,t.setItem(e,a),a>5&&(this.showDMPrivacyWarning=!1)}else t.setItem(e,1)}}}},23047:(t,e,a)=>{a.r(e),a.d(e,{default:()=>s});var i=a(99347);const s={props:{thread:{type:Object},convo:{type:Object},hideAvatars:{type:Boolean,default:!1},hideTimestamps:{type:Boolean,default:!1},largerText:{type:Boolean,default:!1}},data:function(){return{profile:window._sharedData.user}},methods:{truncate:function(t){return _.truncate(t)},viewOriginal:function(){var t=this.ctxContext.media;window.location.href=t},isEmoji:function(t){var e=t.replace(new RegExp("[\0-ữf]","g"),""),a=t.replace(new RegExp("[\n\rs]+|( )+","g"),"");return e.length===a.length},copyText:function(){window.App.util.clipboard(this.ctxContext.text),this.closeCtxMenu()},clickLink:function(){var t=this.ctxContext.text;1!=this.ctxContext.meta.local&&(t="/i/redirect?url="+encodeURI(this.ctxContext.text)),window.location.href=t},formatCount:function(t){return window.App.util.format.count(t)},confirmDelete:function(){this.$emit("confirm-delete")},expandMedia:function(t){(0,i.default)({el:t.target})}}}},21153:(t,e,a)=>{a.r(e),a.d(e,{render:()=>i,staticRenderFns:()=>s});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"dm-page-component"},[t.isLoaded?e("div",{staticClass:"container-fluid mt-lg-3 pb-lg-5"},[e("div",{staticClass:"row dm-page-component-row"},[e("div",{staticClass:"col-md-3 d-md-block"},[e("sidebar",{attrs:{user:t.profile}})],1),t._v(" "),e("div",{staticClass:"col-md-6 p-0"},[t.loaded&&"read"==t.page?e("div",{staticClass:"messages-page"},[e("div",{staticClass:"card shadow-none"},[e("div",{staticClass:"h4 card-header font-weight-bold text-dark d-flex justify-content-between align-items-center",staticStyle:{"letter-spacing":"-0.3px"}},[e("button",{staticClass:"btn btn-light rounded-pill text-dark",on:{click:function(e){return t.goBack()}}},[e("i",{staticClass:"far fa-chevron-left fa-lg"})]),t._v(" "),e("div",[t._v("Direct Message")]),t._v(" "),e("button",{staticClass:"btn btn-light rounded-pill text-dark",on:{click:function(e){return t.showOptions()}}},[e("i",{staticClass:"far fa-cog fa-lg"})])]),t._v(" "),e("ul",{staticClass:"list-group list-group-flush",staticStyle:{position:"relative"}},[e("li",{staticClass:"list-group-item border-bottom sticky-top"},[e("p",{staticClass:"text-center small text-muted mb-0"},[t._v("\n\t\t\t\t\t\t\t\t\tConversation with "),e("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.thread.username))])])])]),t._v(" "),e("transition",{attrs:{name:"fade"}},[t.showDMPrivacyWarning&&t.showPrivacyWarning?e("ul",{staticClass:"list-group list-group-flush dm-privacy-warning",staticStyle:{position:"absolute",top:"105px",width:"100%"}},[e("li",{staticClass:"list-group-item border-bottom sticky-top bg-warning"},[e("div",{staticClass:"d-flex align-items-center justify-content-between"},[e("div",{staticClass:"d-none d-lg-block"},[e("i",{staticClass:"fas fa-exclamation-triangle text-danger fa-lg mr-3"})]),t._v(" "),e("div",[e("p",{staticClass:"small warning-text mb-0 font-weight-bold"},[e("span",{staticClass:"d-inline d-lg-none"},[t._v("DMs")]),e("span",{staticClass:"d-none d-lg-inline"},[t._v("Direct messages on Pixelfed")]),t._v(" are not end-to-end encrypted.\n\t\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("p",{staticClass:"small warning-text mb-0 font-weight-bold"},[t._v("\n\t\t\t\t\t\t\t\t\t\t\tUse caution when sharing sensitive data.\n\t\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("button",{staticClass:"btn btn-link text-decoration-none",on:{click:t.togglePrivacyWarning}},[e("i",{staticClass:"far fa-times-circle fa-lg"}),t._v(" "),e("span",{staticClass:"d-none d-lg-block"},[t._v("Close")])])])])]):t._e()]),t._v(" "),e("ul",{staticClass:"list-group list-group-flush dm-wrapper",staticStyle:{"overflow-y":"scroll",position:"relative","flex-direction":"column-reverse"}},[t._l(t.thread.messages,(function(a,i){return e("li",{staticClass:"list-group-item border-0 chat-msg mb-n2"},[e("message",{attrs:{convo:a,thread:t.thread,hideAvatars:t.hideAvatars,hideTimestamps:t.hideTimestamps,largerText:t.largerText},on:{"confirm-delete":function(e){return t.deleteMessage(i)}}})],1)})),t._v(" "),t.showLoadMore&&t.thread.messages&&t.thread.messages.length>5?e("li",{staticClass:"list-group-item border-0"},[e("p",{staticClass:"text-center small text-muted"},[t.loadingMessages?e("button",{staticClass:"btn btn-primary font-weight-bold rounded-pill btn-sm px-3",attrs:{disabled:""}},[t._v("Loading...")]):e("button",{staticClass:"btn btn-primary font-weight-bold rounded-pill btn-sm px-3",on:{click:function(e){return t.loadOlderMessages()}}},[t._v("Load Older Messages")])])]):t._e()],2),t._v(" "),e("div",{staticClass:"card-footer bg-white p-0"},[e("div",{staticClass:"dm-reply-form"},[e("div",{staticClass:"dm-reply-form-input-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.replyText,expression:"replyText"}],staticClass:"form-control form-control-lg",attrs:{placeholder:"Type a message...",disabled:t.uploading},domProps:{value:t.replyText},on:{input:function(e){e.target.composing||(t.replyText=e.target.value)}}}),t._v(" "),e("button",{staticClass:"upload-media-btn btn btn-link",attrs:{disabled:t.uploading},on:{click:t.uploadMedia}},[e("i",{staticClass:"far fa-image fa-2x"})])]),t._v(" "),e("button",{staticClass:"dm-reply-form-submit-btn btn btn-primary",attrs:{disabled:!t.replyText||!t.replyText.length||t.showReplyTooLong},on:{click:t.sendMessage}},[e("i",{staticClass:"far fa-paper-plane fa-lg"})])])]),t._v(" "),t.uploading?e("div",{staticClass:"card-footer dm-status-bar"},[e("p",[t._v("Uploading ("+t._s(t.uploadProgress)+"%) ...")])]):t._e(),t._v(" "),t.showReplyLong?e("div",{staticClass:"card-footer dm-status-bar"},[e("p",{staticClass:"text-warning"},[t._v(t._s(t.replyText.length)+"/500")])]):t._e(),t._v(" "),t.showReplyTooLong?e("div",{staticClass:"card-footer dm-status-bar"},[e("p",{staticClass:"text-danger"},[t._v(t._s(t.replyText.length)+"/500 - Your message exceeds the limit of 500 characters")])]):t._e(),t._v(" "),e("div",{staticClass:"d-none card-footer p-0"},[e("p",{staticClass:"d-flex justify-content-between align-items-center mb-0 px-3 py-1 small"},[e("span",[e("span",{staticClass:"btn btn-primary btn-sm font-weight-bold py-0 px-3 rounded-pill",on:{click:t.uploadMedia}},[e("i",{staticClass:"fas fa-upload mr-1"}),t._v("\n\t\t\t\t\t\t\t\t\t\tAdd Photo/Video\n\t\t\t\t\t\t\t\t\t")])]),t._v(" "),e("input",{staticClass:"d-none",attrs:{type:"file",id:"uploadMedia",name:"uploadMedia",accept:"image/jpeg,image/png,image/gif,video/mp4"}}),t._v(" "),e("span",{staticClass:"text-muted font-weight-bold"},[t._v(t._s(t.replyText.length)+"/500")])])])],1)]):t._e(),t._v(" "),t.loaded&&"options"==t.page?e("div",{staticClass:"messages-page"},[e("div",{staticClass:"card shadow-none"},[e("div",{staticClass:"h4 card-header font-weight-bold text-dark d-flex justify-content-between align-items-center",staticStyle:{"letter-spacing":"-0.3px"}},[e("button",{staticClass:"btn btn-light rounded-pill text-dark",on:{click:function(e){return e.preventDefault(),t.goBack("read")}}},[e("i",{staticClass:"far fa-chevron-left fa-lg"})]),t._v(" "),e("div",[t._v("Direct Message Settings")]),t._v(" "),t._m(0)]),t._v(" "),e("ul",{staticClass:"list-group list-group-flush",staticStyle:{height:"698px"}},[e("div",{staticClass:"list-group-item media border-bottom"},[e("div",{staticClass:"d-inline-block custom-control custom-switch ml-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.hideAvatars,expression:"hideAvatars"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"customSwitch0"},domProps:{checked:Array.isArray(t.hideAvatars)?t._i(t.hideAvatars,null)>-1:t.hideAvatars},on:{change:function(e){var a=t.hideAvatars,i=e.target,s=!!i.checked;if(Array.isArray(a)){var o=t._i(a,null);i.checked?o<0&&(t.hideAvatars=a.concat([null])):o>-1&&(t.hideAvatars=a.slice(0,o).concat(a.slice(o+1)))}else t.hideAvatars=s}}}),t._v(" "),e("label",{staticClass:"custom-control-label",attrs:{for:"customSwitch0"}})]),t._v(" "),e("div",{staticClass:"d-inline-block ml-3 font-weight-bold"},[t._v("\n\t\t\t\t\t\t\t\t\tHide Avatars\n\t\t\t\t\t\t\t\t")])]),t._v(" "),e("div",{staticClass:"list-group-item media border-bottom"},[e("div",{staticClass:"d-inline-block custom-control custom-switch ml-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.hideTimestamps,expression:"hideTimestamps"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"customSwitch1"},domProps:{checked:Array.isArray(t.hideTimestamps)?t._i(t.hideTimestamps,null)>-1:t.hideTimestamps},on:{change:function(e){var a=t.hideTimestamps,i=e.target,s=!!i.checked;if(Array.isArray(a)){var o=t._i(a,null);i.checked?o<0&&(t.hideTimestamps=a.concat([null])):o>-1&&(t.hideTimestamps=a.slice(0,o).concat(a.slice(o+1)))}else t.hideTimestamps=s}}}),t._v(" "),e("label",{staticClass:"custom-control-label",attrs:{for:"customSwitch1"}})]),t._v(" "),e("div",{staticClass:"d-inline-block ml-3 font-weight-bold"},[t._v("\n\t\t\t\t\t\t\t\t\tHide Timestamps\n\t\t\t\t\t\t\t\t")])]),t._v(" "),e("div",{staticClass:"list-group-item media border-bottom"},[e("div",{staticClass:"d-inline-block custom-control custom-switch ml-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.largerText,expression:"largerText"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"customSwitch2"},domProps:{checked:Array.isArray(t.largerText)?t._i(t.largerText,null)>-1:t.largerText},on:{change:function(e){var a=t.largerText,i=e.target,s=!!i.checked;if(Array.isArray(a)){var o=t._i(a,null);i.checked?o<0&&(t.largerText=a.concat([null])):o>-1&&(t.largerText=a.slice(0,o).concat(a.slice(o+1)))}else t.largerText=s}}}),t._v(" "),e("label",{staticClass:"custom-control-label",attrs:{for:"customSwitch2"}})]),t._v(" "),e("div",{staticClass:"d-inline-block ml-3 font-weight-bold"},[t._v("\n\t\t\t\t\t\t\t\t\tLarger Text\n\t\t\t\t\t\t\t\t")])]),t._v(" "),e("div",{staticClass:"list-group-item media border-bottom d-flex align-items-center"},[e("div",{staticClass:"d-inline-block custom-control custom-switch ml-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.mutedNotifications,expression:"mutedNotifications"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"customSwitch4"},domProps:{checked:Array.isArray(t.mutedNotifications)?t._i(t.mutedNotifications,null)>-1:t.mutedNotifications},on:{change:function(e){var a=t.mutedNotifications,i=e.target,s=!!i.checked;if(Array.isArray(a)){var o=t._i(a,null);i.checked?o<0&&(t.mutedNotifications=a.concat([null])):o>-1&&(t.mutedNotifications=a.slice(0,o).concat(a.slice(o+1)))}else t.mutedNotifications=s}}}),t._v(" "),e("label",{staticClass:"custom-control-label",attrs:{for:"customSwitch4"}})]),t._v(" "),e("div",{staticClass:"d-inline-block ml-3 font-weight-bold"},[t._v("\n\t\t\t\t\t\t\t\t\tMute Notifications\n\t\t\t\t\t\t\t\t\t"),e("p",{staticClass:"small mb-0"},[t._v("You will not receive any direct message notifications from "),e("strong",[t._v(t._s(t.thread.username))]),t._v(".")])])]),t._v(" "),e("div",{staticClass:"list-group-item media border-bottom d-flex align-items-center"},[e("div",{staticClass:"d-inline-block custom-control custom-switch ml-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.showDMPrivacyWarning,expression:"showDMPrivacyWarning"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"customSwitch5"},domProps:{checked:Array.isArray(t.showDMPrivacyWarning)?t._i(t.showDMPrivacyWarning,null)>-1:t.showDMPrivacyWarning},on:{change:function(e){var a=t.showDMPrivacyWarning,i=e.target,s=!!i.checked;if(Array.isArray(a)){var o=t._i(a,null);i.checked?o<0&&(t.showDMPrivacyWarning=a.concat([null])):o>-1&&(t.showDMPrivacyWarning=a.slice(0,o).concat(a.slice(o+1)))}else t.showDMPrivacyWarning=s}}}),t._v(" "),e("label",{staticClass:"custom-control-label",attrs:{for:"customSwitch5"}})]),t._v(" "),t._m(1)])])])]):t._e()]),t._v(" "),t.conversationProfile?e("div",{staticClass:"col-md-3 d-none d-md-block"},[e("div",{staticClass:"card shadow-sm mb-3",staticStyle:{"border-radius":"15px"}},[e("div",{staticClass:"small card-header font-weight-bold text-uppercase text-lighter",staticStyle:{"letter-spacing":"-0.3px"}},[t._v("\n\t\t\t\t\t\tConversation\n\t\t\t\t\t")]),t._v(" "),e("div",{staticClass:"card-body p-2"},[e("div",{staticClass:"media user-card user-select-none"},[e("div",[e("img",{staticClass:"avatar shadow cursor-pointer",attrs:{src:t.conversationProfile.avatar,draggable:"false",onerror:"this.onerror=null;this.src='/storage/avatars/default.png?v=0';"}})]),t._v(" "),e("div",{staticClass:"media-body"},[e("p",{staticClass:"display-name",domProps:{innerHTML:t._s(t.conversationProfile.display_name)},on:{click:function(e){return t.gotoProfile(t.conversationProfile)}}}),t._v(" "),e("p",{staticClass:"username primary",on:{click:function(e){return t.gotoProfile(t.conversationProfile)}}},[t._v("\n\t\t\t\t\t\t\t\t\t@"+t._s(t.conversationProfile.acct)+"\n\t\t\t\t\t\t\t\t")]),t._v(" "),e("p",{staticClass:"stats"},[e("span",{staticClass:"stats-following"},[e("span",{staticClass:"following-count"},[t._v(t._s(t.formatCount(t.conversationProfile.following_count)))]),t._v(" Following\n\t\t\t\t\t\t\t\t\t")]),t._v(" "),e("span",{staticClass:"stats-followers"},[e("span",{staticClass:"followers-count"},[t._v(t._s(t.formatCount(t.conversationProfile.followers_count)))]),t._v(" Followers\n\t\t\t\t\t\t\t\t\t")])])])])])])]):t._e()])]):e("div",{staticClass:"d-flex justify-content-center align-items-center",staticStyle:{height:"calc(100vh - 58px)"}},[e("b-spinner")],1)])},s=[function(){var t=this._self._c;return t("div",{staticClass:"btn btn-light rounded-pill text-dark"},[t("i",{staticClass:"far fa-smile fa-lg"})])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"d-inline-block ml-3 font-weight-bold"},[t._v("\n\t\t\t\t\t\t\t\t\tShow Privacy Warning\n\t\t\t\t\t\t\t\t\t"),e("p",{staticClass:"small mb-0"},[t._v("Show privacy warning indicating that direct messages are not end-to-end encrypted and that caution is advised when sending sensitive/confidential information.")])])}]},95064:(t,e,a)=>{a.r(e),a.d(e,{render:()=>i,staticRenderFns:()=>s});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"dm-chat-message chat-msg"},[e("div",{staticClass:"media d-inline-flex mb-0",class:{isAuthor:t.convo.isAuthor}},[t.convo.isAuthor||t.hideAvatars?t._e():e("img",{staticClass:"mr-3 shadow msg-avatar",attrs:{src:t.thread.avatar,alt:"avatar",width:"50",onerror:"this.onerror=null;this.src='/storage/avatars/default.jpg';"}}),t._v(" "),e("div",{staticClass:"media-body"},["photo"==t.convo.type?e("p",{staticClass:"pill-to p-0 shadow"},[e("img",{staticClass:"media-embed",staticStyle:{cursor:"pointer"},attrs:{src:t.convo.media,onerror:"this.onerror=null;this.src='/storage/no-preview.png';"},on:{click:function(e){return e.preventDefault(),t.expandMedia.apply(null,arguments)}}})]):"link"==t.convo.type?e("div",{staticClass:"d-inline-flex mb-0 cursor-pointer"},[e("div",{staticClass:"card shadow border",staticStyle:{width:"240px","border-radius":"18px"}},[e("div",{staticClass:"card-body p-0",attrs:{title:t.convo.text}},[e("div",{staticClass:"media align-items-center"},[t.convo.meta.local?e("div",{staticClass:"bg-primary mr-3 p-3",staticStyle:{"border-radius":"18px"}},[e("i",{staticClass:"fas fa-link text-white fa-2x"})]):e("div",{staticClass:"bg-light mr-3 p-3",staticStyle:{"border-radius":"18px"}},[e("i",{staticClass:"fas fa-link text-lighter fa-2x"})]),t._v(" "),e("div",{staticClass:"media-body text-muted small text-truncate pr-2 font-weight-bold"},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.convo.meta.local?t.convo.text.substr(8):t.convo.meta.domain)+"\n\t\t\t\t\t\t\t\t")])])])])]):"video"==t.convo.type?e("p",{staticClass:"pill-to p-0 shadow mb-0",staticStyle:{"line-height":"0"}},[e("video",{staticClass:"media-embed",staticStyle:{"border-radius":"20px"},attrs:{src:t.convo.media,controls:""}})]):"emoji"==t.convo.type?e("p",{staticClass:"p-0 emoji-msg"},[t._v("\n\t\t\t\t"+t._s(t.convo.text)+"\n\t\t\t")]):"story:react"==t.convo.type?e("p",{staticClass:"pill-to p-0 shadow",staticStyle:{width:"140px","margin-bottom":"10px",position:"relative"}},[e("img",{staticStyle:{"border-radius":"20px"},attrs:{src:t.convo.meta.story_media_url,width:"140",onerror:"this.onerror=null;this.src='/storage/no-preview.png';"}}),t._v(" "),e("span",{staticClass:"badge badge-light rounded-pill border",staticStyle:{"font-size":"20px",position:"absolute",bottom:"-10px",left:"-10px"}},[t._v("\n\t\t\t\t\t"+t._s(t.convo.meta.reaction)+"\n\t\t\t\t")])]):"story:comment"==t.convo.type?e("span",{staticClass:"p-0",staticStyle:{display:"flex","justify-content":"flex-start","margin-bottom":"10px",position:"relative"}},[e("span",{},[e("img",{staticClass:"d-block pill-to p-0 mr-0 pr-0 mb-n1",staticStyle:{"border-radius":"20px"},attrs:{src:t.convo.meta.story_media_url,width:"140",onerror:"this.onerror=null;this.src='/storage/no-preview.png';"}}),t._v(" "),e("span",{staticClass:"pill-to shadow text-break",staticStyle:{width:"fit-content"}},[t._v(t._s(t.convo.meta.caption))])])]):e("p",{class:[t.largerText?"pill-to shadow larger-text text-break":"pill-to shadow text-break"]},[t._v("\n\t\t\t\t"+t._s(t.convo.text)+"\n\t\t\t")]),t._v(" "),"story:react"==t.convo.type?e("p",{staticClass:"small text-muted mb-0 ml-0"},[e("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.convo.meta.story_actor_username))]),t._v(" reacted your story\n\t\t\t")]):t._e(),t._v(" "),"story:comment"==t.convo.type?e("p",{staticClass:"small text-muted mb-0 ml-0"},[e("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.convo.meta.story_actor_username))]),t._v(" replied to your story\n\t\t\t")]):t._e(),t._v(" "),e("p",{staticClass:"msg-timestamp small text-muted font-weight-bold d-flex align-items-center justify-content-start",attrs:{"data-timestamp":"timestamp"}},[t.convo.hidden?e("span",{staticClass:"small pr-2",attrs:{title:"Filtered Message","data-toggle":"tooltip","data-placement":"bottom"}},[e("i",{staticClass:"fas fa-lock"})]):t._e(),t._v(" "),t.hideTimestamps?t._e():e("span",[t._v("\n\t\t\t\t\t"+t._s(t.convo.timeAgo)+"\n\t\t\t\t")]),t._v(" "),t.convo.isAuthor?e("button",{staticClass:"btn btn-link btn-sm text-lighter pl-2 font-weight-bold",on:{click:t.confirmDelete}},[e("i",{staticClass:"far fa-trash-alt"})]):t._e()])]),t._v(" "),t.convo.isAuthor&&!t.hideAvatars?e("img",{staticClass:"ml-3 shadow msg-avatar",attrs:{src:t.profile.avatar,alt:"avatar",width:"50",onerror:"this.onerror=null;this.src='/storage/avatars/default.jpg';"}}):t._e()])])},s=[]},44427:(t,e,a)=>{a.r(e),a.d(e,{render:()=>i,staticRenderFns:()=>s});var i=function(){this._self._c;return this._m(0)},s=[function(){var t=this._self._c;return t("div",{staticClass:"ph-item border-0 shadow-sm p-1",staticStyle:{"border-radius":"15px","margin-bottom":"1rem"}},[t("div",{staticClass:"ph-col-12"},[t("div",{staticClass:"ph-row align-items-center mt-0"},[t("div",{staticClass:"ph-avatar mr-3 d-flex",staticStyle:{"min-width":"40px",width:"40px!important",height:"40px!important","border-radius":"15px"}}),this._v(" "),t("div",{staticClass:"ph-col-6 big"})])])])}]},70338:(t,e,a)=>{a.r(e),a.d(e,{default:()=>o});var i=a(1519),s=a.n(i)()((function(t){return t[1]}));s.push([t.id,'.dm-page-component[data-v-bd901ba2]{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif}.dm-page-component .user-card[data-v-bd901ba2]{align-items:center}.dm-page-component .user-card .avatar[data-v-bd901ba2]{border:1px solid var(--border-color);border-radius:15px;height:60px;margin-right:.8rem;width:60px}.dm-page-component .user-card .avatar-update-btn[data-v-bd901ba2]{background:hsla(0,0%,100%,.9);border:1px solid #dee2e6!important;border-radius:50rem;bottom:0;height:20px;padding:0;position:absolute;right:12px;width:20px}.dm-page-component .user-card .avatar-update-btn-icon[data-v-bd901ba2]{-webkit-font-smoothing:antialiased;display:inline-block;font-family:Font Awesome\\ 5 Free;font-style:normal;font-variant:normal;font-weight:400;line-height:1;text-rendering:auto}.dm-page-component .user-card .avatar-update-btn-icon[data-v-bd901ba2]:before{content:"\\f013"}.dm-page-component .user-card .username[data-v-bd901ba2]{cursor:pointer;font-size:13px;font-weight:600;margin-bottom:0}.dm-page-component .user-card .display-name[data-v-bd901ba2]{color:var(--body-color);cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:800!important;line-height:.8;margin-bottom:0;-webkit-user-select:all;-moz-user-select:all;user-select:all}.dm-page-component .user-card .stats[data-v-bd901ba2]{font-size:12px;margin-bottom:0;margin-top:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.dm-page-component .user-card .stats .stats-following[data-v-bd901ba2]{margin-right:.8rem}.dm-page-component .user-card .stats .followers-count[data-v-bd901ba2],.dm-page-component .user-card .stats .following-count[data-v-bd901ba2]{font-weight:800}.dm-page-component .dm-reply-form[data-v-bd901ba2]{background-color:var(--card-bg);display:flex;justify-content:space-between;padding:1rem}.dm-page-component .dm-reply-form .btn.focus[data-v-bd901ba2],.dm-page-component .dm-reply-form .btn[data-v-bd901ba2]:focus,.dm-page-component .dm-reply-form input.focus[data-v-bd901ba2],.dm-page-component .dm-reply-form input[data-v-bd901ba2]:focus{box-shadow:none;outline:0}.dm-page-component .dm-reply-form[data-v-bd901ba2] :disabled{opacity:20%!important}.dm-page-component .dm-reply-form-input-group[data-v-bd901ba2]{margin-right:10px;position:relative;width:100%}.dm-page-component .dm-reply-form-input-group input[data-v-bd901ba2]{background-color:var(--comment-bg);border-color:var(--comment-bg)!important;border-radius:25px;color:var(--dark);font-size:15px;padding-right:60px;position:absolute}.dm-page-component .dm-reply-form-input-group .upload-media-btn[data-v-bd901ba2]{color:var(--text-lighter);position:absolute;right:10px;top:50%;transform:translateY(-50%)}.dm-page-component .dm-reply-form-submit-btn[data-v-bd901ba2]{border-radius:24px;height:48px;width:48px}.dm-page-component .dm-status-bar[data-v-bd901ba2]{color:var(--text-lighter);font-size:12px;font-weight:600}.dm-page-component .dm-status-bar p[data-v-bd901ba2]{margin-bottom:0}.dm-page-component .dm-privacy-warning .btn[data-v-bd901ba2],.dm-page-component .dm-privacy-warning p[data-v-bd901ba2]{color:#000}.dm-page-component .dm-privacy-warning .warning-text[data-v-bd901ba2]{text-align:left}@media (min-width:992px){.dm-page-component .dm-privacy-warning .warning-text[data-v-bd901ba2]{text-align:center}}.dm-page-component-row .dm-wrapper[data-v-bd901ba2]{height:calc(100vh - 240px);padding-top:100px}@media (min-width:500px){.dm-page-component-row .dm-wrapper[data-v-bd901ba2]{min-height:40vh}}@media (min-width:700px){.dm-page-component-row .dm-wrapper[data-v-bd901ba2]{height:60vh}}',""]);const o=s},35524:(t,e,a)=>{a.r(e),a.d(e,{default:()=>o});var i=a(1519),s=a.n(i)()((function(t){return t[1]}));s.push([t.id,".chat-msg[data-v-667e9bbe]{padding-bottom:0;padding-top:0}.reply-btn[data-v-667e9bbe]{border-radius:0 3px 3px 0;bottom:54px;position:absolute;right:20px;text-align:center;width:90px}.media-body .bg-primary[data-v-667e9bbe]{background:linear-gradient(135deg,#2ea2f4,#0b93f6)!important}.pill-to[data-v-667e9bbe]{background:var(--bg-light);margin-right:3rem}.pill-from[data-v-667e9bbe],.pill-to[data-v-667e9bbe]{border-radius:20px!important;font-weight:500;margin-bottom:.25rem;padding:.5rem 1rem}.pill-from[data-v-667e9bbe]{background:linear-gradient(135deg,#2ea2f4,#0b93f6)!important;color:#fff!important;margin-left:3rem;text-align:right!important}.chat-smsg[data-v-667e9bbe]:hover{background:var(--light-hover-bg)}.no-focus[data-v-667e9bbe]{border:none!important}.no-focus[data-v-667e9bbe]:focus{box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none;outline:none!important;outline-width:0!important}.emoji-msg[data-v-667e9bbe]{font-size:4rem!important;line-height:30px!important;margin-top:10px!important}.larger-text[data-v-667e9bbe]{font-size:22px}.dm-chat-message .isAuthor[data-v-667e9bbe]{float:right;margin-right:.5rem!important}.dm-chat-message .isAuthor .pill-to[data-v-667e9bbe]{background:linear-gradient(135deg,#2ea2f4,#0b93f6)!important;border-radius:20px!important;color:#fff!important;font-weight:500;margin-bottom:.25rem;margin-left:3rem;margin-right:0;padding:.5rem 1rem;text-align:right!important}.dm-chat-message .isAuthor .msg-timestamp[data-v-667e9bbe]{display:block!important;margin-bottom:0;text-align:right}.dm-chat-message .msg-avatar[data-v-667e9bbe]{border-radius:14px;height:50px;width:50px}.dm-chat-message .media-embed[data-v-667e9bbe]{border-radius:20px;width:140px}@media (min-width:450px){.dm-chat-message .media-embed[data-v-667e9bbe]{width:200px}}",""]);const o=s},17511:(t,e,a)=>{a.r(e),a.d(e,{default:()=>r});var i=a(93379),s=a.n(i),o=a(70338),n={insert:"head",singleton:!1};s()(o.default,n);const r=o.default.locals||{}},2831:(t,e,a)=>{a.r(e),a.d(e,{default:()=>r});var i=a(93379),s=a.n(i),o=a(35524),n={insert:"head",singleton:!1};s()(o.default,n);const r=o.default.locals||{}},17360:(t,e,a)=>{a.r(e),a.d(e,{default:()=>n});var i=a(73746),s=a(26077),o={};for(const t in s)"default"!==t&&(o[t]=()=>s[t]);a.d(e,o);a(51396);const n=(0,a(51900).default)(s.default,i.render,i.staticRenderFns,!1,null,"bd901ba2",null).exports},64491:(t,e,a)=>{a.r(e),a.d(e,{default:()=>n});var i=a(64517),s=a(50438),o={};for(const t in s)"default"!==t&&(o[t]=()=>s[t]);a.d(e,o);a(28060);const n=(0,a(51900).default)(s.default,i.render,i.staticRenderFns,!1,null,"667e9bbe",null).exports},33795:(t,e,a)=>{a.r(e),a.d(e,{default:()=>s});var i=a(9690);const s=(0,a(51900).default)({},i.render,i.staticRenderFns,!1,null,null,null).exports},26077:(t,e,a)=>{a.r(e),a.d(e,{default:()=>o});var i=a(63744),s={};for(const t in i)"default"!==t&&(s[t]=()=>i[t]);a.d(e,s);const o=i.default},50438:(t,e,a)=>{a.r(e),a.d(e,{default:()=>o});var i=a(23047),s={};for(const t in i)"default"!==t&&(s[t]=()=>i[t]);a.d(e,s);const o=i.default},73746:(t,e,a)=>{a.r(e);var i=a(21153),s={};for(const t in i)"default"!==t&&(s[t]=()=>i[t]);a.d(e,s)},64517:(t,e,a)=>{a.r(e);var i=a(95064),s={};for(const t in i)"default"!==t&&(s[t]=()=>i[t]);a.d(e,s)},9690:(t,e,a)=>{a.r(e);var i=a(44427),s={};for(const t in i)"default"!==t&&(s[t]=()=>i[t]);a.d(e,s)},51396:(t,e,a)=>{a.r(e);var i=a(17511),s={};for(const t in i)"default"!==t&&(s[t]=()=>i[t]);a.d(e,s)},28060:(t,e,a)=>{a.r(e);var i=a(2831),s={};for(const t in i)"default"!==t&&(s[t]=()=>i[t]);a.d(e,s)}}]);