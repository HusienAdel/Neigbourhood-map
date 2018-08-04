// Foursquare API Information
const client_id = "BRSXR25JKG35EBO33M2LQANSVA155DJG4PZM4YC2QPZPDFQC";
const client_secret = "KFHEE1Z1VBEXDTF5CTHUTHSGO0NKY5AGIFRWEXVCHT0ZXVAL";

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