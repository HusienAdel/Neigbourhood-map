// my apisINFo foursequare
const client_id = "XY0WOAIRR1A3MX1CAPGVHK4VUCBUMBAYJPHZA2L4EURMIHTI";
const client_secret = "KLKQIDSEEKOG30VGYKDI1MEE12FAZLPPA3OBMMWTNOC4TF3W";
const v = '20180804';

export const fetchImges = (venuesID) => {
    const imgUrl = `https://api.foursquare.com/v2/venues/${venuesID}/photos?limit=9&client_id=${client_id}&client_secret=${client_secret}&v=${v}`;
    return new Promise((resolve, reject) => {
        fetch(imgUrl).then(response => {
            if (response.ok) {
                return response.json()
            }
            reject('api quota exceeded')
        }).then(data => {
            if (data) {
                const {prefix, height, width, suffix, user, source} = data.response.photos.items[0];
                resolve({
                    src: `${prefix}${height}x${width}${suffix}`,
                    user,
                    source
                })
            }
        }).catch(err => reject('an issue with for Square api'))
    })

};



export default fetchImges;