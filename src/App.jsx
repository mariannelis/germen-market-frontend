import { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import PublicLayout from '@/layouts/PublicLayout'
import AdminLayout from '@/layouts/AdminLayout'
import Loading from '@/components/Loading'
import ProtectedRoute from '@/components/ProtectedRoute'
import OrdersAdmin from '@/pages/admin/OrdersAdmin'

// Páginas públicas
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Páginas para clientes registrados
const Products = lazy(() => import('@/pages/Products'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))

// Páginas del administrador
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const ProductsAdmin = lazy(() =>
  import('@/pages/admin/ProductsAdmin')
)
const CreateProduct = lazy(() =>
  import('@/pages/admin/CreateProduct')
)
const EditProduct = lazy(() =>
  import('@/pages/admin/EditProduct')
)

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Área pública */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Solo clientes registrados o admin */}
            <Route
              path="/productos"
              element={
                <ProtectedRoute
                  allowedRoles={['customer', 'admin']}
                >
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/productos/:id"
              element={
                <ProtectedRoute
                  allowedRoles={['customer', 'admin']}
                >
                  <ProductDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/carrito"
              element={
                <ProtectedRoute
                  allowedRoles={['customer', 'admin']}
                >
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute
                  allowedRoles={['customer', 'admin']}
                >
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Área exclusiva de administración */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            <Route
              path="productos"
              element={<ProductsAdmin />}
            />

            <Route
              path="productos/nuevo"
              element={<CreateProduct />}
            />

            <Route
              path="productos/:id/editar"
              element={<EditProduct />}
            />

            <Route
              path="pedidos"
              element={<OrdersAdmin />}
            />
          </Route>

          {/* Ruta inexistente */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App