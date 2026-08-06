import { jsx as _jsx } from "react/jsx-runtime";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from "clsx";
import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import styles from "./styles.css.js";
export function InternalLoadingBar({ variant, __internalRootRef, ...rest }) {
    return (_jsx("div", { ref: __internalRootRef, ...getDataAttributes(rest), className: clsx([styles.root, styles[`variant-${variant}`]]) }));
}
//# sourceMappingURL=internal.js.map