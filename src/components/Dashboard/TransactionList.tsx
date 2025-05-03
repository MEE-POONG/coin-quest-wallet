import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "../../types";
import { mockTransactions } from "../../data/mockData";
import { transactionService } from "@/services/transactionService";
import { startProgress, doneProgress } from "@/utils/nprogress";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'APPROVED':
      return 'bg-green-500/20 text-green-400';
    case 'REJECTED':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'DEPOSIT':
      return '⬆️';
    case 'WITHDRAWAL':
      return '⬇️';
    case 'PURCHASE':
      return '🛒';
    case 'GIFT':
      return '🎁';
    default:
      return '💰';
  }
};

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      startProgress();
      try {
        const data = await transactionService.getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
        doneProgress();
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="nft-gradient-border glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {isLoading ? (
            <div className="py-4 text-center text-gray-400">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="py-4 text-center text-gray-400">No transactions yet</div>
          ) : (
            <div className="overflow-y-auto max-h-[300px] scrollbar-thin">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-nft-darkbg flex items-center justify-center">
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-xs text-gray-400">{formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`font-bold ${transaction.type === 'DEPOSIT' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'DEPOSIT' ? '+' : '-'}{transaction.amount}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
