// 生成PDF
import JsPDF  from 'jspdf';
import html2Canvas from 'html2canvas';
export default {
    install(Vue:any,options:any){
        Vue.prototype.getPdf = function () {
            let title:string = 'IPv6转换规模与复杂度与评估报告';
            // @ts-ignore
            html2Canvas(document.querySelector('#pdfDom'),{
                allowTaint: true
            }).then(function (canvas:any) {
                    let contentWidth = canvas.width
                    let contentHeight = canvas.height
                    let pageHeight = contentWidth / 592.28 * 841.89
                    let leftHeight = contentHeight
                    let position = 0
                    const imgWidth = 595.28
                    let imgHeight = 592.28 / contentWidth * contentHeight
                    let pageData = canvas.toDataURL('image/jpeg', 1.0)
                    let PDF = new JsPDF('', 'pt', 'a4')
                    if (leftHeight < pageHeight) {
                        PDF.addImage(pageData, 'JPEG', 0, 10, imgWidth, imgHeight)
                    } else {
                        while (leftHeight > 0) {
                            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight
                            position -= 841.89
                            if (leftHeight > 0) {
                                PDF.addPage()
                            }
                        }
                    }
                    PDF.save(title + '.pdf')
                }
            )

        }
    }
}
