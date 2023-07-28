import { NotificationType } from "@/interface/INotification";
import { NOTIFY } from "@/store/mutations-type";
import { store } from "@/store";

export const mixinNotify = {
    methods: {
        notify (type: NotificationType, title: string, text: string) : void {
            store.commit(NOTIFY, {
                title,
                text,
                type,
            })
        },
    }
}