import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import React, { useState } from 'react';
import definirSeEPalindroma from './src/utils/palindrome';

interface ResultadoPalindromo {
  resultaod?: boolean;
  msg?: string;
  lista?: string[];
  erro?: string;
}

export default function App() {
  const [palavra, setPalavra] = useState<string>("");  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dadosResultado, setDadosResultado] = useState<ResultadoPalindromo | null>(null);

  const handleTextChange = (texto: string) => {
    setPalavra(texto);
    if (dadosResultado) setDadosResultado(null);
  };

  const verificarPalindromo = async () => {
    setIsSubmitting(true);
    setDadosResultado(null); // Reseta o card antes de processar
    
    try {
      const resposta = await definirSeEPalindroma(palavra);
      setDadosResultado(resposta);
    } catch (error: any) {
      setDadosResultado({ erro: `Ocorreu um erro ao processar: ${error.message}` });
    } finally {
      setIsSubmitting(false); 
    }
  };

  const isButtonDisabled = palavra.trim() === "" || isSubmitting;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Detector de Palíndromos</Text>
          <Text style={styles.subtitle}>
            Digite uma palavra ou frase para descobrir se ela pode ser lida da mesma forma de trás para frente.
          </Text>

          <TextInput 
            style={[styles.input, isSubmitting && styles.inputDisabled]} 
            placeholder="Ex: A sacada da casa"
            placeholderTextColor="#9ca3af"
            value={palavra}
            onChangeText={handleTextChange}
            editable={!isSubmitting}
            autoCapitalize="sentences"
          />

          <TouchableOpacity 
            style={[styles.button, isButtonDisabled && styles.buttonDisabled]} 
            disabled={isButtonDisabled}
            onPress={verificarPalindromo}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? "Analisando..." : "Verificar Texto"}
            </Text>
          </TouchableOpacity>

          {dadosResultado && !dadosResultado.erro && (
            <View style={[
              styles.resultContainer, 
              dadosResultado.resultaod ? styles.resultSuccess : styles.resultError
            ]}>
              <Text style={styles.resultTitle}>
                {dadosResultado.resultaod ? "É Palíndroma!" : "Não é Palíndroma"}
              </Text>
              <Text style={styles.resultMessage}>{dadosResultado.msg}</Text>
              
              <Text style={styles.resultArrayTitle}>Matriz extraída:</Text>
              <Text style={styles.resultArrayText}>
                [{dadosResultado.lista?.join(', ')}]
              </Text>
            </View>
          )}

          {dadosResultado?.erro && (
            <View style={[styles.resultContainer, styles.resultError]}>
              <Text style={styles.resultTitle}>Erro no Processamento</Text>
              <Text style={styles.resultMessage}>{dadosResultado.erro}</Text>
            </View>
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 20,
  },
  inputDisabled: {
    opacity: 0.6,
    backgroundColor: '#F3F4F6',
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#A5B4FC',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  resultSuccess: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981', 
  },
  resultError: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  resultMessage: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
  },
  resultArrayTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  resultArrayText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', 
    color: '#4B5563',
    backgroundColor: '#FFFFFF', 
    padding: 8,
    borderRadius: 6,
    overflow: 'hidden',
  }
});