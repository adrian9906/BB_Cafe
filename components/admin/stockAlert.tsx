import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function StockAlert({stock}:{stock: number}) {
    const router = useRouter()

    return (
        <>
             <Card className="mb-8 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                    ⚠️ Atención: Problemas de Stock Detectados
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {stock > 0 && (
                      <span className="font-medium">
                        {stock} producto(s) sin stock
                      </span>
                    )}
                    . Se recomienda reabastecer pronto.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/admin/products')}
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                >
                  Ver Productos
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
    )
}