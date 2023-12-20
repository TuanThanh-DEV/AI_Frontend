const downloadFile = {

    downloadFile: () => {
        const { myData } = this.state; // I am assuming that "this.state.myData"
        // is an object and I wrote it to file as
        // json
        const fileName = "file";
        const json = JSON.stringify(myData);
        const blob = new Blob([json], { type: 'application/json' });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}

export { EmployeeSalaryExportPDFData };