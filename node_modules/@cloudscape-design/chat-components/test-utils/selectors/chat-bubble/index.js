"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const selectors_1 = require("@cloudscape-design/test-utils-core/selectors");
const loading_bar_1 = require("../loading-bar");
const styles_selectors_js_1 = require("../../../chat-bubble/styles.selectors.js");
const styles_selectors_js_2 = require("../../../loading-bar/styles.selectors.js");
class ChatBubbleWrapper extends selectors_1.ComponentWrapper {
    findAvatarSlot() {
        const isAvatarHidden = !!this.find(`.${styles_selectors_js_1.default.avatar}.${styles_selectors_js_1.default.hide}`);
        return isAvatarHidden ? null : this.findByClassName(styles_selectors_js_1.default.avatar);
    }
    findContentSlot() {
        return this.findByClassName(styles_selectors_js_1.default.content);
    }
    findActionsSlot() {
        return this.findByClassName(styles_selectors_js_1.default.actions);
    }
    findLoadingBar() {
        return this.findComponent(`.${styles_selectors_js_1.default["message-area"]} .${styles_selectors_js_2.default.root}`, loading_bar_1.default);
    }
}
exports.default = ChatBubbleWrapper;
ChatBubbleWrapper.rootSelector = styles_selectors_js_1.default.root;
//# sourceMappingURL=index.js.map