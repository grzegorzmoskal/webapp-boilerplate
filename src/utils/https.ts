export const get = <T>(url: string, data: any = null) => request<T>(url, data, null, "GET")
export const post = <T>(url: string, data: any) => request<T>(url, data, null, "POST")
export const put = <T>(url: string, data: any) => request<T>(url, data, null, "PUT")

export const errors = {
    serverError: "serverError",
    unprocessableEnity: "unprocessableEntity",
    unprocessableResponse: "unprocessableResponse"
}

const httpsError = (name: keyof typeof errors, message?: string) => ({ name, message })

export const formatParams = (params: any) => {
    const keys = Object.keys(params)
    if (!keys.length) return ""
    return "?" + keys.map(key => key + "=" + encodeURIComponent(params[key])).join("&")
}

export function request<T>(url: string, data: any = null, bearer: string | null = null, method = "POST"): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        let resolved = false
        const client = new XMLHttpRequest()

        client.onreadystatechange = () => {
            if (resolved || client.readyState !== 4) return

            resolved = true
            try {
                const res: T = JSON.parse(client.responseText)

                if (client.status === 422) {
                    reject(httpsError("unprocessableEnity", ""))
                }
                if (client.status >= 300) {
                    reject(httpsError("serverError", `Bad status: ${url} -> ${client.status} (${client.responseText})`))
                    return
                }
                resolve(res)
            } catch (error) {
                reject(httpsError("unprocessableResponse", ""))
            }
        }

        if (method === "GET" && data) url += formatParams(data)
        client.open(method, url, true)
        if (bearer) client.setRequestHeader("Authorization", "Bearer " + bearer)

        if (method !== "GET" && data) {
            client.setRequestHeader("Content-Type", "application/json; charset=utf-8")
            client.send(JSON.stringify(data))
        } else {
            client.send()
        }
    })
}
