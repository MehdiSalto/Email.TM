import { jsx as _jsx } from "react/jsx-runtime";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import InternalChatBubble from "./internal";
export default function ChatBubble({ type, hideAvatar, showLoadingBar, ...props }) {
    const baseComponentProps = useBaseComponent("ChatBubble", {
        props: { type },
    });
    return (_jsx(InternalChatBubble, { type: type, hideAvatar: hideAvatar, showLoadingBar: showLoadingBar, ...props, ...baseComponentProps }));
}
applyDisplayName(ChatBubble, "ChatBubble");
//# sourceMappingURL=index.js.map