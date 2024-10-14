function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const clientName = document.getElementById('clientName').value;
    const product = document.getElementById('product').value;
    const amount = document.getElementById('amount').value;
    const paymentTerms = document.getElementById('paymentTerms').value;
    const authorization = document.getElementById('authorization').value;
  
    doc.setFontSize(16);
    doc.text("Contrato de Venda", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Nome do Cliente: ${clientName}`, 20, 40);
    doc.text(`Produto/Serviço: ${product}`, 20, 50);
    doc.text(`Valor (R$): ${amount}`, 20, 60);
    doc.text("Condições de Pagamento:", 20, 70);
    doc.text(paymentTerms, 20, 80, { maxWidth: 170 });
    doc.text("Autorização:", 20, 100);
    doc.text(authorization, 20, 110, { maxWidth: 170 });
  
    doc.save("contrato.pdf");
  }
  