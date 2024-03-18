import WAWebJS, {Client} from "whatsapp-web.js";
import {Command} from "../types/command";

const everyone: Command = {
    name: "everyone",
    aliases: ["all", "semua", "semuanya", "minna"],
    description: "Tag seluruh orang.",
    action: async (herta: Client, message: WAWebJS.Message) => {
        const chat = (await message.getChat()) as any;

        if (!chat.isGroup) {
            return
        }

        const authorId = message.author;

        for (let participant of chat.participants) {
            if (participant.id._serialized === authorId && !participant.isAdmin) {
                return
            }
        }

        let text = "";
        let mentions = [];

        for (let participant of chat.participants) {
            const contact = await herta.getContactById(participant.id._serialized);

            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        chat.sendMessage(text, {mentions});
    },
};

export default everyone;
