class User < ApplicationRecord

    validates :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, :first_name, :last_name, :buying_power, presence: true
    validates :password, confirmation: true, length: { minimum: 10, allow_nil: true }
    attr_reader :password
    after_initialize :ensure_session_token

    has_many :transactions
    has_many :tickers, -> { distinct }, :through => :transactions

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return user if user && user.is_password?(password)
        nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save!
        self.session_token
    end

end