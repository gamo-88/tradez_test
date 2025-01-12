import apisauce from 'apisauce'
import config from '../alpacaConfig'

const alpacaApi = (baseURL = config.BASE_URL) => {
    const api = apisauce.create(
        {
            baseURL: config.BASE_URL,
            headers: {
                // "APCA-API-KEY-ID: {YOUR_API_KEY_ID}"  
                // "APCA-API-SECRET-KEY: {YOUR_API_SECRET_KEY}"  

                "APCA-API-KEY-ID": config.ALPACA_API_KEY_ID,  
                "APCA-API-SECRET-KEY": config.ALPACA_API_SECRET_KEY  
            
            },
            timeout: 5000
        }
    )

    const getAccount = ()=> api.get("v2/account")
    const getPositions = ()=>api.get("v2/positions")
    const getMarketData = ()=>api.get("v2/assets")

    return {
        getAccount,
        getPositions,
        getMarketData
    }
}

export default alpacaApi