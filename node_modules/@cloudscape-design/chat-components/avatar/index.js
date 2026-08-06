import { jsx as _jsx } from "react/jsx-runtime";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import InternalAvatar from "./internal";
export default function Avatar({ color = "default", iconName = "user-profile", ...props }) {
    const baseComponentProps = useBaseComponent("Avatar", { props: { color, iconName } });
    return _jsx(InternalAvatar, { color: color, iconName: iconName, ...props, ...baseComponentProps });
}
applyDisplayName(Avatar, "Avatar");
//# sourceMappingURL=index.js.map