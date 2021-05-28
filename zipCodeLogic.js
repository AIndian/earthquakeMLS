let zipcodeURL = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=&rows=3000&facet=state&facet=timezone&facet=dst&geofilter.polygon=(37.81%2C+-124.49)%2C+(37.81%2C+-105.61)%2C+(32.06%2C+-105.61)%2C+(32.06%2C-124.49)"

d3.json(zipcodeURL).then(function(data) {
    json = data.records
    fields = Object.keys(json[0]['fields'])
    replacer = function(key, value) { return value === null ? '' : value }
    csv = json.map(function(row) {
        return fields.map(function(fieldName) {
            return JSON.stringify(row['fields'][fieldName], replacer)
        }).join(',')
    })

    headers = ['City', 'Zipcode', 'DST', 'Geopoint1', 'Geopoint2', 'Longitude', 'State', 'Latitude', 'Timezone']
    csv.unshift(headers.join(',')) // add header column

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += csv.join('\r\n');
    
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zipcodes.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
})