/* eslint-disable import/no-anonymous-default-export */
import * as httpRequest from "~/Util/httpsRequest";
class PublicService {
    async search({ text = "", limit = "5" }) {
        try {
            const result = await httpRequest.GET("search", {
                params: {
                    text,
                    limit,
                },
            });
            console.log(result);
            return result.data;
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    }
}

export default new PublicService();
