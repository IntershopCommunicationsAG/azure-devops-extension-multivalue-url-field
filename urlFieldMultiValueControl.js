function isEmpty(str) {
    return (!str || 0 === str.length);
}

function urlFieldUpdate (workItemServices) {
    workItemServices.WorkItemFormService.getService().then(function (service) {
        var url = VSS.getConfiguration().witInputs.Url;
        var titleUrlText = VSS.getConfiguration().witInputs.Title;
        var fieldName = VSS.getConfiguration().witInputs.Field;
        var hideUrlIfEmptyField = (VSS.getConfiguration().witInputs.HideUrlIfEmptyField.toLowerCase() === 'true');
        var MultiValueCheck = (VSS.getConfiguration().witInputs.MultiValueCheck.toLowerCase() === 'true');
        
        service.getFieldValues([VSS.getConfiguration().witInputs.Field]).then(function (value) {
            var fieldValue = value[fieldName];
            var fieldValues = [];

            // Get the fieldelement by ID
            var urlField = document.getElementById('urlFieldMulti');
            
            // MultiValue
            if (MultiValueCheck){
                // If MultiValueCheck == true than split by ";" and create multiple URLs
                tmpFieldValues = fieldValue.replace(/ /g, '').split(";");
                for(var i=0; i<tmpFieldValues.length; i++){
                    fieldValues.push(
                        {"url": url.replace('{field}', tmpFieldValues[i]), "title": tmpFieldValues[i]}
                    )
                }
            }
            // One Value
            else{
                url = url.replace('{field}', fieldValue);
                if (isEmpty(titleUrlText)) {
                    titleUrlText = url;
                }
                fieldValues.push(
                    {"url": url, "title": titleUrlText}
                )
            }

            if (hideUrlIfEmptyField && isEmpty(fieldValues)) {
                // Delete all url nodes
                urlField.innerHTML = '';
            } else {
                 // Delete all url nodes
                urlField.innerHTML = '';
                // Create all url nodes
                for(var i=0; i<fieldValues.length; i++){
                    btn = document.createElement("A");
                    btn.innerHTML = fieldValues[i]['title'];
                    btn.target = "_blank";
                    btn.setAttribute('style', "padding-left: 6px;");
                    btn.href =  fieldValues[i]['url'];
                    urlField.appendChild(btn);
                }
            }
            // Set extention height
            VSS.resize(null,document.getElementsByTagName("body").item(0).offsetHeight); 
        });
    });
};

VSS.require(["TFS/WorkItemTracking/Services"], function(workItemServices) {
    VSS.register(VSS.getContribution().id, () => {
        return {
            onLoaded: () => {
                urlFieldUpdate(workItemServices);
            },
            onSaved: () => {
                urlFieldUpdate(workItemServices);
            },
            onRefreshed: () => {
                urlFieldUpdate(workItemServices);
            },
            onFieldChanged: function(args) {
                urlFieldUpdate(workItemServices);
            }
        }
    });
    VSS.notifyLoadSucceeded();
});
