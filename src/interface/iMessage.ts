import { Message } from "discord.js";

export default interface iMessage {
  code: string;
  mentionId: string;
  message: Message
}