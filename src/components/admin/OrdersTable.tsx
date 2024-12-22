import React from 'react';
import { Button } from "@/components/ui/button";

interface OrdersTableProps {
  orders: any[]; // We'll type this properly when we have the full order type
  onViewDetails: (order: any) => void;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}

export const OrdersTable = ({ orders, onViewDetails, onUpdateStatus }: OrdersTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nº Pedido
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fornecedor
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendedor
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{order.id}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.clienteRazaoSocial}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.fornecedor}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.vendedorNome}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'processado' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                R$ {order.total.toFixed(2)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(order)}
                  >
                    Detalhes
                  </Button>
                  {order.status === 'pendente' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(order.id, 'processado')}
                    >
                      Processar
                    </Button>
                  )}
                  {order.status === 'processado' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(order.id, 'encaminhado')}
                    >
                      Encaminhar
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};