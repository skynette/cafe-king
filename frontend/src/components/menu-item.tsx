import { MenuItem as MenItemType } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type MenuItemProps = {
    menuItem: MenItemType
    addToCart: () => void
}

const MenuItem = ({ menuItem, addToCart }: MenuItemProps) => {
    return (
        <Card className="cursor-pointer" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                NGN{(menuItem.price / 100).toFixed(2)}
            </CardContent>
        </Card>
    )
}

export default MenuItem