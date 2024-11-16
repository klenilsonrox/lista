'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const productList = [
    'Queijo',
    'Presunto fatiado',
    'Presunto Peça',
    'Bacon maia',
    'Bacon fatia',
    'Bacon em cubos',
    'Catupiry',
    'Cheddar',
    'Maionese bag',
    'Maionese caixa',
    'Catchup',
    'Molho de tomate',
    'Molho chipotle',
    'Molho barbecue',
    'Molho tártaro',
    'Molho de alho',
    'Milho',
    "Batata palha",
    'Tempero grill',
    'Confete',
    'Paçoca',
    'Leite em pó',
    "Contra Filé picadinho",
    "contra filé peça",
    'Maçã de peito',
    'Sal',
    'Tomate',
    'Alface',
    'Cebola',
    'Pimentão',
    'cenoura',
    'Cheiro verde',
    'Orégano',
    'Banana',
    'Embalagem macarrao na chapa Pequena',
    'Embalagem macarrao na Grande',
    'Embalagem sanduiche',
    'Embalagem macarão gratinado pequeno',
    'Embalagem macarão gratinado grande',
    'Embalagem Omelete',
    'Sacola pequena',
    'Sacola média',
    'Sacola grande',
  ];

  // Carregar seleção inicial do localStorage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setSelectedItems(savedItems);
  }, []);

  // Salvar seleção no localStorage
  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const toggleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item)); // Remove do selecionado
    } else {
      setSelectedItems([...selectedItems, item]); // Adiciona ao selecionado
    }
  };

  const handleSendWhatsapp = (number) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} às ${now
      .toLocaleTimeString()
      .slice(0, 5)}`;

    const message = `Lista de hoje (${formattedDate}):\n\n${selectedItems.join('\n')}`;
    const whatsappLink = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setShowModal(false); // Fecha o modal após enviar
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Lista de Produtos</h1>

        <ul className="space-y-3 max-h-[500px] lg:max-h-[700px] overflow-y-auto p-3">
          {productList.map((item, index) => (
            <li
              key={index}
              onClick={() => toggleSelectItem(item)}
              className={`cursor-pointer p-4 rounded-md border ${
                selectedItems.includes(item)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Enviar WhatsApp
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-lg font-semibold mb-4">Escolha um contato</h2>
              <button
                onClick={() => handleSendWhatsapp('31988334434')}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md mb-3 hover:bg-green-600"
              >
                Enviar para Tatiana
              </button>
              <button
                onClick={() => handleSendWhatsapp('31991699353')}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Enviar para Alberto
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
