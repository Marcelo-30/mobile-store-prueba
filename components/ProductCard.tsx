import {View, Text} from "react-native";

type ProductCardProps ={
    title: string;
    price: number;
}

export default function ProductCard({title, price}:ProductCardProps){
    return(
        <View>
            <Text>{title}</Text>
            <Text>${price}</Text>
        </View>
    );
}