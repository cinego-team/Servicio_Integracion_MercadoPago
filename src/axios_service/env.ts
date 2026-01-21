export const config = {
    MSVentasUrls: {
        baseUrl: 'http://localhost:3002',
        cerrarCobroById: (id: number) => `/cerrar-venta/${id}`,
    },
};
