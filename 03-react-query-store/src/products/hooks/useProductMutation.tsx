import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product, productActions } from "..";

export const useProductMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: productActions.createProduct,
        onMutate: (product) => {
            // Optimistic product
            const optimisticProduct = { id: Math.random(), ...product };

            // Almacenar el producto en el caché del query client
            queryClient.setQueryData<Product[]>(
                ["products", { filterKey: product.category }],
                (old) => {
                    if(!old) return [optimisticProduct];

                    return [...old, optimisticProduct];
                },
            );

            return {
                optimisticProduct,
            };
        },
        onSuccess: (product, variables, context) => {
            // queryClient.invalidateQueries(
            //     ["products", { filterKey: product.category }]
            // );

            queryClient.removeQueries(
                ["product", context?.optimisticProduct.id],
            );

            queryClient.setQueryData<Product[]>(
                ["products", { filterKey: product.category }],
                (old) => {
                    if(!old) return [product];

                    return old.map((cacheProduct) => {
                        return cacheProduct.id === context?.optimisticProduct.id
                            ? product
                            : cacheProduct;
                    });
                },
            );
        },
        onError: (error, variables, context) => {
            queryClient.removeQueries(
                ["product", context?.optimisticProduct.id],
            );

            queryClient.setQueryData<Product[]>(
                ["products", { filterKey: variables.category }],
                (old) => {
                    if(!old) return [];

                    return old.filter((cacheProduct) => {
                        return cacheProduct.id !== context?.optimisticProduct.id;
                    });
                },
            );
        },
    });

    return mutation;
};