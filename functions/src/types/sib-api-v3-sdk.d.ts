declare module 'sib-api-v3-sdk' {
  export class ApiClient {
    static instance: ApiClient;
    authentications: {
      'api-key': {
        apiKey: string;
      };
    };
  }

  export class EmailCampaignsApi {
    createEmailCampaign(campaign: CreateEmailCampaign): Promise<any>;
  }

  export class CreateEmailCampaign {
    name: string;
    subject: string;
    sender: {
      name: string;
      email: string;
    };
    type: string;
    htmlContent: string;
    recipients: {
      listIds: number[];
    };
    scheduledAt: string;
  }
} 