import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/dom";
import LoadingBarWrapper from "../loading-bar";
export default class ChatBubbleWrapper extends ComponentWrapper {
    static rootSelector: string;
    findAvatarSlot(): ElementWrapper | null;
    findContentSlot(): ElementWrapper | null;
    findActionsSlot(): ElementWrapper | null;
    findLoadingBar(): LoadingBarWrapper | null;
}
