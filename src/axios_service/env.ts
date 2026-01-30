export const config = {
    MSVentasUrls: {
        baseUrl: 'process.env.IP_ADDRESS:3002', //'http://localhost:3002',
        cerrarCobroById: (id: number) => `/cerrar-venta/${id}`,
    },
};
