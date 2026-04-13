import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from './ProductCard'
import { Product } from './ProductCard' // ajuste o caminho

// Mock do console.log para testar o fallback
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

const mockProduct: Product = {
  id: 1,
  title: 'Produto Teste',
  price: 99.9,
  description: 'Descrição do produto teste.',
  category: 'eletrônicos',
  image: 'https://example.com/img.jpg',
  rating: { rate: 4.5, count: 10 },
}

describe('ProductCard', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar o título, preço e descrição corretamente', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(`R$ ${mockProduct.price.toFixed(2)}`)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
  })

  it('deve exibir a imagem com src e alt corretos', () => {
    render(<ProductCard product={mockProduct} />)
    const img = screen.getByRole('img', { name: mockProduct.title })
    expect(img).toHaveAttribute('src', mockProduct.image)
    expect(img).toHaveAttribute('alt', mockProduct.title)
  })

  it('deve envolver o Card com um link que aponta para /produto/:id', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/produto/${mockProduct.id}`)
  })

  it('deve chamar onBuy ao clicar no botão, se a prop for fornecida', async () => {
    const mockOnBuy = jest.fn()
    render(<ProductCard product={mockProduct} onBuy={mockOnBuy} />)
    const button = screen.getByRole('button', { name: /ver detalhes/i })
    await userEvent.click(button)

    expect(mockOnBuy).toHaveBeenCalledTimes(1)
    expect(mockOnBuy).toHaveBeenCalledWith(mockProduct)
    expect(consoleLogSpy).not.toHaveBeenCalled()
  })

  it('deve logar no console ao clicar no botão, se onBuy não for fornecido', async () => {
    render(<ProductCard product={mockProduct} />)
    const button = screen.getByRole('button', { name: /ver detalhes/i })
    await userEvent.click(button)

    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    expect(consoleLogSpy).toHaveBeenCalledWith('Comprar:', mockProduct.title)
  })

  it('deve exibir o rating corretamente', () => {
    render(<ProductCard product={mockProduct} />)
    // O Rating do MUI renderiza estrelas com role="img" e atributo aria-label
    const rating = screen.getByRole('img', { name: /avaliado em/i })
    expect(rating).toBeInTheDocument()
    // Opcional: verificar o valor (depende da implementação)
  })
})