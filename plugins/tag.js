/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {Module} = require('../main')
const {getString} = require('./misc/lang');
const {readFileSync} = require('fs');
const {saveMessage} = require('./misc/saveMessage');
const Lang = getString('group');
Module({pattern: 'tag|hidetag ?(.*)',use: 'group', fromMe: true, desc: Lang.TAGALL_DESC}, (async (message, match) => {
if (!message.jid.endsWith('@g.us')) return await message.sendMessage(Lang.GROUP_COMMAND)
if (match[1] === "all" || match[1] === "admin" || !message.reply_message) return;
var target = message.jid
if (match[1] && match[1].endsWith("us") && /[0-9]+(-[0-9]+|)(@g.us|@s.whatsapp.net)/g.test(match[1])) target = [...match[1].match(/[0-9]+(-[0-9]+|)(@g.us|@s.whatsapp.net)/g)];
var group = await message.client.groupMetadata(target)
var jids = [];
group.participants.map(async(user) => {
jids.push(user.id.replace('c.us', 's.whatsapp.net'));});
await message.forwardMessage(target,message.quoted,{detectLinks: true,contextInfo: {mentionedJid: jids}});
}))
Module({pattern: 'tagadmin',use: 'group', fromMe: true, desc: "Tags admins",usage: '.tag or .tag jid'}, (async (message, match) => {
    if (!message.jid.endsWith('@g.us')) return await message.sendMessage(Lang.GROUP_COMMAND)
    if (!message.reply_message) return;
    var group = await message.client.groupMetadata(message.jid)
    var jids = [];
    var admins = group.participants.filter(v => v.admin !== null).map(x => x.id);
    admins.map(async(user) => {
    jids.push(user.replace('c.us', 's.whatsapp.net'));});
    await message.forwardMessage(message.jid,message.quoted,{detectLinks: true,contextInfo: {mentionedJid: jids}});
}))
Module({pattern: 'forward ?(.*)',use: 'utility', fromMe: true, desc: "forwards message"}, (async (message, match) => {
    if (!match[1] || !message.reply_message) return await message.sendReply("*Reply to a message*\n*Ex: .forward jid jid ...*")
    let Jids = [...match[1].match(/[0-9]+(-[0-9]+|)(@g.us|@s.whatsapp.net)/g)]
        for (let jid of Jids) {
      await message.forwardMessage(jid, message.quoted,{detectLinks: true});
    }
}));