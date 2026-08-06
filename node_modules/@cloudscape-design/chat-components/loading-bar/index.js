import { jsx as _jsx } from "react/jsx-runtime";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { InternalLoadingBar } from "./internal";
export default function LoadingBar(props) {
    const baseComponentProps = useBaseComponent("LoadingBar", { props: { variant: props.variant } });
    return _jsx(InternalLoadingBar, { ...props, ...baseComponentProps });
}
applyDisplayName(LoadingBar, "LoadingBar");
//# sourceMappingURL=index.js.map