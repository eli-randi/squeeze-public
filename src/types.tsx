

export type ConnectorConfig = {
    name: string;
    label: string;
    submit_url: string;
    fields: Record<string, GenericConnectorField>;
    extra_widgets: GenericConnectorWidget[] | null;
}

export type GenericConnectorFormData = Record<string, string | number>;

export type GenericConnectorField = Record<string, string | number | string[]>;

export type GenericConnectorWidget = {
    type: string;
    url: string;
    label: string;
};