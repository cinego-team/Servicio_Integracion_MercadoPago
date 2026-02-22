export const config = {
    MSVentasUrls: {
        baseUrl: 'http://localhost:3003',
        cerrarCobroById: (id: number) => `/venta/cerrar-venta/${id}`,
    },
};
