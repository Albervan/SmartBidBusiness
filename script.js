document.getElementById('product').addEventListener('change', function() {
  const otherProductInput = document.getElementById('otherProduct');
  if (this.value === 'Outro') {
    otherProductInput.style.display = 'block';
    otherProductInput.required = true;
  } else {
    otherProductInput.style.display = 'none';
    otherProductInput.required = false;
  }
});

document.getElementById('quantity').addEventListener('input', calculateValues);
document.getElementById('unitValue').addEventListener('input', calculateValues);
document.getElementById('commissionValue').addEventListener('input', calculateValues);

function calculateValues() {
  const quantity = parseFloat(document.getElementById('quantity').value) || 0;
  const unitValue = parseFloat(document.getElementById('unitValue').value) || 0;
  const commissionValue = parseFloat(document.getElementById('commissionValue').value) || 0;

  const totalValue = quantity * unitValue;
  const totalCommission = quantity * commissionValue;

  document.getElementById('totalValue').value = totalValue.toFixed(2);
  document.getElementById('totalCommission').value = totalCommission.toFixed(2);
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const agreementType = document.querySelector('input[name="agreementType"]:checked').value;
  const date = document.getElementById('date').value;
  const clientName = document.getElementById('clientName').value;
  const location = document.getElementById('location').value;
  const product = document.getElementById('product').value === 'Outro' ? document.getElementById('otherProduct').value : document.getElementById('product').value;
  const quantity = document.getElementById('quantity').value;
  const unit = document.getElementById('unit').value;
  const totalValue = document.getElementById('totalValue').value;
  const totalCommission = document.getElementById('totalCommission').value;
  const paymentTerms = document.getElementById('paymentTerms').value;
  const authorization = document.getElementById('authorization').value;

  doc.setFontSize(16);
  doc.text("Acordo de Negociação", 20, 20);

  doc.setFontSize(12);
  doc.text(`Tipo de Acordo: ${agreementType}`, 20, 40);
  doc.text(`Data: ${date}`, 20, 50);
  doc.text(`Nome do Cliente: ${clientName}`, 20, 60);
  doc.text(`Local do Carregamento: ${location}`, 20, 70);
  doc.text(`Produto: ${product}`, 20, 80);
  doc.text(`Quantidade: ${quantity} ${unit}`, 20, 90);
  doc.text(`Valor Total (R$): ${totalValue}`, 20, 100);
  doc.text(`Comissão Total (R$): ${totalCommission}`, 20, 110);
  doc.text("Condições de Pagamento:", 20, 120);
  doc.text(paymentTerms, 20, 130, { maxWidth: 170 });
  doc.text("Autorização:", 20, 150);
  doc.text(authorization, 20, 160, { maxWidth: 170 });

  window.open(doc.output('bloburl'));
}
