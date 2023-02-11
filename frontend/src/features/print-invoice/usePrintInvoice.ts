import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const usePrintInvoice = (order: any) => {
	const download = (order: any) => {
		const doc = new jsPDF();

		autoTable(doc, {
			body: [
				[
					{
						content: 'Company brand',
						styles: {
							halign: 'left',
							fontSize: 20,
							textColor: '#ffffff'
						}
					},
					{
						content: 'Invoice',
						styles: {
							halign: 'right',
							fontSize: 20,
							textColor: '#ffffff'
						}
					}
				],
			],
			theme: 'plain',
			styles: {
				fillColor: '#3366ff'
			}
		});

		autoTable(doc, {
			body: [
				[
					{
						content: 'Reference: #INV0001'
							+'\nDate: 2022-01-27'
							+'\nInvoice number: 123456',
						styles: {
							halign: 'right'
						}
					}
				],
			],
			theme: 'plain'
		});

		autoTable(doc, {
			body: [
				[
					{
						content: 'Billed to:'
							+'\nJohn Doe'
							+'\nBilling Address line 1'
							+'\nBilling Address line 2'
							+'\nZip code - City'
							+'\nCountry',
						styles: {
							halign: 'left'
						}
					},
					{
						content: 'Shipping address:'
							+'\nJohn Doe'
							+'\nShipping Address line 1'
							+'\nShipping Address line 2'
							+'\nZip code - City'
							+'\nCountry',
						styles: {
							halign: 'left'
						}
					},
					{
						content: 'From:'
							+'\nCompany name'
							+'\nShipping Address line 1'
							+'\nShipping Address line 2'
							+'\nZip code - City'
							+'\nCountry',
						styles: {
							halign: 'right'
						}
					}
				],
			],
			theme: 'plain'
		});

		autoTable(doc, {
			body: [
				[
					{
						content: 'Amount due:',
						styles: {
							halign:'right',
							fontSize: 14
						}
					}
				],
				[
					{
						content: '$4000',
						styles: {
							halign:'right',
							fontSize: 20,
							textColor: '#3366ff'
						}
					}
				],
				[
					{
						content: 'Due date: 2022-02-01',
						styles: {
							halign:'right'
						}
					}
				]
			],
			theme: 'plain'
		});

		autoTable(doc, {
			body: [
				[
					{
						content: 'Products & Services',
						styles: {
							halign:'left',
							fontSize: 14
						}
					}
				]
			],
			theme: 'plain'
		});

		autoTable(doc, {
			head: [['Items', 'Category', 'Quantity', 'Price', 'Tax', 'Amount']],
			body: [
				['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
				['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
				['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
				['Product or service name', 'Category', '2', '$450', '$50', '$1000']
			],
			theme: 'striped',
			headStyles:{
				fillColor: '#343a40'
			}
		});

		autoTable(doc, {
			body: [
				[
					{
						content: 'Subtotal:',
						styles:{
							halign:'right'
						}
					},
					{
						content: '$3600',
						styles:{
							halign:'right'
						}
					},
				],
				[
					{
						content: 'Total tax:',
						styles:{
							halign:'right'
						}
					},
					{
						content: '$400',
						styles:{
							halign:'right'
						}
					},
				],
				[
					{
						content: 'Total amount:',
						styles:{
							halign:'right'
						}
					},
					{
						content: '$4000',
						styles:{
							halign:'right'
						}
					},
				],
			],
			theme: 'plain'
		});

		autoTable(doc, {
			body: [
				[
					{
						content: 'Terms & notes',
						styles: {
							halign: 'left',
							fontSize: 14
						}
					}
				],
				[
					{
						content: 'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia'
							+'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum'
							+'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
						styles: {
							halign: 'left'
						}
					}
				],
			],
			theme: "plain"
		});

		autoTable(doc, {
			body: [
				[
					{
						content: 'This is a centered footer',
						styles: {
							halign: 'center'
						}
					}
				]
			],
			theme: "plain"
		});

		return doc.save("invoice")
	}

	return { download };

}