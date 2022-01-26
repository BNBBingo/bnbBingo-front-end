import { Response } from 'global/interface'

const sendPost = (requestUrl: string, params: any): Promise<any> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }

  return fetch(process.env.REACT_APP_API_NODE + requestUrl, requestOptions)
    .then((response) => response.json())
    /*.catch((ex) => {
      return { result: false, msg: ex.message }
    })*/
}

export const getTickets = async (address: string, limit: number, offset: number): Promise<any> => {
  const response = await sendPost('/tickets', {
    address: address,
    limit: limit,
    offset: offset
  })
  return response
}


