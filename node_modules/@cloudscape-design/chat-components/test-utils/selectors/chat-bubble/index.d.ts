import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
import LoadingBarWrapper from "../loading-bar";
export default class ChatBubbleWrapper extends ComponentWrapper {
    static rootSelector: string;
    findAvatarSlot(): ElementWrapper | null;
    findContentSlot(): ElementWrapper;
    findActionsSlot(): ElementWrapper;
    findLoadingBar(): LoadingBarWrapper;
}
