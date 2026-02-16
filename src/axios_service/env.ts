export const config = {
    MSVentasUrls: {
        baseUrl: `http://localhost:${process.env.PUERTO_MS_VENTAS}`,
        cerrarCobroById: (id: number) => `/cerrar-venta/${id}`,
    },
};
