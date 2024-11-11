import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const orders = [
    {
      id: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
      date: "2023-05-15",
    },
    {
      id: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
      date: "2023-05-20",
    },
    {
      id: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
      date: "2023-05-25",
    },
    {
      id: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
      date: "2023-05-30",
    },
    {
      id: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
      date: "2023-06-05",
    },
  ]
  
  export default function OrderHistory() {
    return (
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell className="text-right">{order.totalAmount}</TableCell>
              <TableCell className="text-right">{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }