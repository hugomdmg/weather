import { environment } from "../../environments/environment";
class Api {
    private static api_url = environment.API_URL

    public static async post(url: string, data: Object) {
        try {
            const res = await fetch(this.api_url + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }

            const response = await res.json();
            return response;

        } catch (error) {
            console.error('Error in POST request:', error);
            return { error: error };
        }

    }

}


export default Api