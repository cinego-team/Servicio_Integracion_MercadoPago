export const config = {
    MSVentasUrls: {
        baseUrl: process.env.URL_MS_VENTAS || 'http://localhost:3002',
        cerrarCobroById: (id: number) => `/cerrar-venta/${id}`,
    },
};
