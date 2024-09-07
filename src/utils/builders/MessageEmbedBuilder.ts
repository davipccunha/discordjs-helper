import { ColorResolvable, Embed, EmbedBuilder, EmbedData } from "discord.js";
import { ExtendedClient } from "../../models/ExtendedClient";

export type EmbedField = {
    name: string,
    value: string,
    inline?: boolean
}

export type EmbedAuthor = {
    name: string,
    url?: string,
    iconURL?: string
}

export type EmbedFooter = {
    text: string,
    iconURL?: string
}

export type EmbedInitialData = {
    title?: string,
    description?: string,
    color?: ColorResolvable,
    showTimestamp?: boolean,
    defaultFooter?: boolean
}


export class MessageEmbedBuilder {
    private embed: EmbedBuilder;
    static defaultFooter: EmbedFooter | null;
    static defaultColor: ColorResolvable = "NotQuiteBlack";

    constructor(data: EmbedInitialData) {
        data = {
            title: data.title,
            description: data.description || " ",
            color: data.color || MessageEmbedBuilder.defaultColor,
            showTimestamp: data.showTimestamp ?? true,
            defaultFooter: data.defaultFooter ?? true
        };

        this.embed = new EmbedBuilder(data as EmbedData);

        // For some reason, not resetting the color after initializing the embed will throw an error "color is not int"
        this.embed.setColor(data.color!);

        if (data.title)
            this.embed.setTitle(data.title);
        if (data.showTimestamp)
            this.embed.setTimestamp();
        this.embed.setFooter(MessageEmbedBuilder.defaultFooter);
    }

    setDefaultColor(color: ColorResolvable) {
        MessageEmbedBuilder.defaultColor = color;
        return this;
    }

    setDefaultFooter(footer: EmbedFooter | null) {
        MessageEmbedBuilder.defaultFooter = footer;
        return this;
    }

    setTitle(title: string) {
        this.embed.setTitle(title);
        return this;
    }

    setDescription(description: string) {
        this.embed.setDescription(description);
        return this;
    }

    addField(field: EmbedField) {
        field.inline = !!field.inline;

        this.embed.addFields([field]);
        return this;
    }

    setFields(...fields: EmbedField[]) {
        for (const field of fields) field.inline = !!field.inline;

        this.embed.setFields(fields);
        return this;
    }

    setThumbnail(url: string) {
        this.embed.setThumbnail(url);
        return this;
    }

    setImage(url: string) {
        this.embed.setImage(url);
        return this;
    }

    setAuthor(author: EmbedAuthor) {
        this.embed.setAuthor(author);
        return this;
    }

    setColor(color: ColorResolvable) {
        this.embed.setColor(color);
        return this;
    }

    setFooter(footer: EmbedFooter) {
        this.embed.setFooter(footer);
        return this;
    }

    setTimestamp(timestamp: number) {
        this.embed.setTimestamp(timestamp);
        return this
    }

    setURL(url: string) {
        this.embed.setURL(url);
        return this;
    }

    build() {
        return this.embed;
    }

    static from(embed: Embed) {
        const builder = new MessageEmbedBuilder(embed as EmbedInitialData);
        builder.embed = EmbedBuilder.from(embed);

        return builder;
    }
}