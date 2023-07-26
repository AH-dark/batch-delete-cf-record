import axios from 'axios'

const apiEmail = ''
const apiKey   = ''
const zoneId   = ''

const api = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`
const headers = {'X-Auth-Email': apiEmail, 'X-Auth-Key': apiKey}
axios.request({url: `${api}?per_page=5000`, headers}).then(({data})=>{ 
  // https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records at List DNS Records
  let errorOccurs = false
  for (const dnsRecord of data.result||[]) {
    axios.request({url: `${api}/${dnsRecord.id}`, method: 'DELETE', headers}).then(({data})=>{
      console.log('delete result', data)
    }).catch(error=>{
      console.error(error, error.response?.data)
      errorOccurs = true
    })
    if (errorOccurs) break
  }
}).catch(error=>{
  console.error(error, error.response?.data)
})
