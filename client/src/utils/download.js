
// функция для загрузки файлов (я испоьзую для загрузки json при бекапе)
export function download(content, fileName, contentType = 'text/plain') {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// download(jsonData, 'json.txt', 'text/plain');